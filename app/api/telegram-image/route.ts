import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Secure proxy endpoint for Telegram images.
 * Prevents exposing TELEGRAM_BOT_TOKEN to client browsers.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPath = searchParams.get("path");

    if (!rawPath) {
      return new NextResponse("Missing image path", { status: 400 });
    }

    // Security: sanitize path to prevent path traversal or SSRF
    // Telegram file paths typically look like "photos/file_123.jpg"
    const cleanPath = rawPath.replace(/^\/+/, "");
    if (cleanPath.includes("..") || cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
      return new NextResponse("Invalid image path", { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return new NextResponse("Telegram bot token not configured", { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/file/bot${botToken}/${cleanPath}`;

    const res = await fetch(telegramUrl, {
      next: { revalidate: 86400 * 7 }, // Cache for 7 days
    });

    if (!res.ok) {
      return new NextResponse("Failed to fetch image from Telegram", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Telegram image proxy error:", error?.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
