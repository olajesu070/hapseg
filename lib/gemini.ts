import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY || "";
  return new GoogleGenAI({ apiKey });
}

export const productExtractionSchema = z.object({
  productName: z.string().describe("Clean, concise commercial title for the product"),
  description: z
    .string()
    .describe("Clean descriptive text highlighting features, omitting phone numbers and item codes"),
  price: z.number().nullable().describe("Extracted numeric price value without currency symbols"),
  itemNo: z.string().nullable().describe("Stock Keeping Unit (SKU), Item ID, or Product Code if present"),
  phoneNumber: z.string().nullable().describe("Extracted raw contact phone or WhatsApp number"),
  category: z
    .enum(["fashion", "kitchen", "varieties"])
    .default("varieties")
    .describe("Product category: fashion, kitchen, or varieties"),
});

export type ExtractedProductData = z.infer<typeof productExtractionSchema>;

export async function parseProductCaptionWithGemini(rawText: string): Promise<ExtractedProductData> {
  const prompt = `
Extract structured e-commerce product information from this Telegram post caption.
Clean up messy formatting, remove emojis from product titles, and strip contact numbers or item codes from the description.
Classify category strictly as one of: 'fashion', 'kitchen', or 'varieties'.

Raw caption text:
"""
${rawText}
"""
`;

  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          description: { type: Type.STRING },
          price: { type: Type.NUMBER, nullable: true },
          itemNo: { type: Type.STRING, nullable: true },
          phoneNumber: { type: Type.STRING, nullable: true },
          category: {
            type: Type.STRING,
            enum: ["fashion", "kitchen", "varieties"],
          },
        },
        required: ["productName", "description", "category"],
      },
    },
  });

  const parsedJson = JSON.parse(response.text || "{}");
  return productExtractionSchema.parse(parsedJson);
}
