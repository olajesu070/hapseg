import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { parseProductCaptionWithGemini } from "@/lib/gemini";
import { uploadTelegramPhotoToStorage } from "@/lib/storage";

export const dynamic = "force-dynamic";

interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface TelegramMessage {
  message_id: number;
  media_group_id?: string;
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
  chat: { id: number | string };
}

/**
 * Timing-safe string comparison to protect against timing attacks on the webhook secret
 */
function verifyWebhookSecret(headerSecret: string | null, expectedSecret: string): boolean {
  if (!headerSecret || headerSecret.length !== expectedSecret.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(headerSecret), Buffer.from(expectedSecret));
}

/**
 * Fallback parser when AI service is rate-limited, experiencing downtime, or prompt injection
 */
function fallbackCaptionParser(caption: string) {
  const fallbackPhone = process.env.DEFAULT_FALLBACK_PHONE || "2347030797836";
  const cleanCaption = caption.trim();

  // Try to extract price with regex (e.g. ₦15000 or $120 or 5000)
  const priceMatch = cleanCaption.match(/(?:₦|\$|NGN|USD)?\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+)/i);
  let price: number | null = null;
  if (priceMatch) {
    const rawNum = parseFloat(priceMatch[1].replace(/,/g, ""));
    if (!isNaN(rawNum) && rawNum > 0 && rawNum < 100_000_000) {
      price = rawNum;
    }
  }

  // First line or first 50 chars as product title
  const firstLine = cleanCaption.split("\n")[0]?.trim();
  const productName = firstLine && firstLine.length > 2 ? firstLine.slice(0, 60) : "New Arrival Item";

  return {
    productName,
    description: cleanCaption || "No description provided",
    price,
    itemNo: null as string | null,
    phoneNumber: fallbackPhone,
    category: "fashion",
  };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Timing-Safe Secret Verification
    const secretToken = req.headers.get("x-telegram-bot-api-secret-token");
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

    if (process.env.NODE_ENV === "production" && !expectedSecret) {
      console.error("TELEGRAM_WEBHOOK_SECRET must be configured in production");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (expectedSecret && !verifyWebhookSecret(secretToken, expectedSecret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload: TelegramMessage | undefined = body.channel_post || body.message;

    if (!payload) {
      return NextResponse.json({ status: "ignored", reason: "No relevant payload" }, { status: 200 });
    }

    // 2. Validate photo presence
    const photos = payload.photo;
    if (!photos || photos.length === 0) {
      return NextResponse.json({ status: "ignored", reason: "No photos found" }, { status: 200 });
    }

    // Select highest resolution photo
    const highestResPhoto = photos[photos.length - 1];
    let imageUrl: string;
    try {
      imageUrl = await uploadTelegramPhotoToStorage(highestResPhoto.file_id);
    } catch (err: any) {
      console.error("Storage upload error:", err.message);
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }

    const rawCaption = (payload.caption || payload.text || "").trim();
    const mediaGroupId = payload.media_group_id;

    // Helper to safely extract with AI + automatic fallback
    const extractMetadata = async (caption: string) => {
      if (!caption) return fallbackCaptionParser("");
      try {
        const parsed = await parseProductCaptionWithGemini(caption);
        // Sanity check price and phone bounds
        const cleanPrice = parsed.price && parsed.price > 0 && parsed.price < 100_000_000 ? parsed.price : null;
        const cleanPhone = parsed.phoneNumber?.replace(/[^0-9]/g, "") || process.env.DEFAULT_FALLBACK_PHONE || "2347030797836";

        return {
          productName: parsed.productName.slice(0, 100),
          description: parsed.description,
          price: cleanPrice,
          itemNo: parsed.itemNo?.slice(0, 30) || null,
          phoneNumber: cleanPhone.length >= 10 ? cleanPhone : (process.env.DEFAULT_FALLBACK_PHONE || "2347030797836"),
          category: parsed.category,
        };
      } catch (aiErr) {
        console.warn("AI extraction warning, using fallback parser:", aiErr);
        return fallbackCaptionParser(caption);
      }
    };

    // 3. Case A: Telegram Media Album (shares media_group_id)
    if (mediaGroupId) {
      const aiData = rawCaption ? await extractMetadata(rawCaption) : null;

      const existingProduct = await prisma.product.findUnique({
        where: { telegramGroupId: mediaGroupId },
      });

      if (existingProduct) {
        // Atomic image append without duplicates
        const updatedImages = existingProduct.images.includes(imageUrl)
          ? existingProduct.images
          : [...existingProduct.images, imageUrl];

        const updatedFields: any = {};
        if (aiData && (!existingProduct.name || existingProduct.name === "New Item" || existingProduct.name === "New Arrival Item")) {
          updatedFields.name = aiData.productName;
          updatedFields.description = aiData.description;
          updatedFields.price = aiData.price;
          updatedFields.itemNo = aiData.itemNo;
          updatedFields.phoneNumber = aiData.phoneNumber;
          updatedFields.category = aiData.category;
        }

        const product = await prisma.product.update({
          where: { telegramGroupId: mediaGroupId },
          data: {
            images: updatedImages,
            ...updatedFields,
          },
        });

        return NextResponse.json({ status: "album_updated", productId: product.id }, { status: 200 });
      }

      // Upsert to handle race condition when concurrent photos arrive before first insert completes
      const initialAiData = aiData || fallbackCaptionParser("");
      const updateData: any = {
        images: { push: imageUrl },
      };

      if (aiData) {
        updateData.name = aiData.productName;
        updateData.description = aiData.description;
        updateData.price = aiData.price;
        updateData.itemNo = aiData.itemNo;
        updateData.phoneNumber = aiData.phoneNumber;
        updateData.category = aiData.category;
      }

      const product = await prisma.product.upsert({
        where: { telegramGroupId: mediaGroupId },
        update: updateData,
        create: {
          telegramGroupId: mediaGroupId,
          name: initialAiData.productName,
          description: initialAiData.description,
          price: initialAiData.price,
          itemNo: initialAiData.itemNo,
          phoneNumber: initialAiData.phoneNumber,
          category: initialAiData.category,
          images: [imageUrl],
        },
      });

      return NextResponse.json({ status: "album_processed", productId: product.id }, { status: 200 });
    }

    // 4. Case B: Single photo post
    const aiData = await extractMetadata(rawCaption);

    const product = await prisma.product.create({
      data: {
        name: aiData.productName,
        description: aiData.description,
        price: aiData.price,
        itemNo: aiData.itemNo,
        phoneNumber: aiData.phoneNumber,
        category: aiData.category,
        images: [imageUrl],
      },
    });

    return NextResponse.json({ status: "single_created", productId: product.id }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
