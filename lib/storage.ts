/**
 * Utility for fetching a Telegram photo and staging/uploading to cloud storage.
 */
export async function uploadTelegramPhotoToStorage(fileId: string): Promise<string> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing in environment variables");
  }

  // 1. Fetch file path from Telegram Bot API
  const getFileRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );
  const fileData = await getFileRes.json();

  if (!fileData.ok || !fileData.result?.file_path) {
    throw new Error(`Failed to resolve Telegram file path: ${fileData.description || "Unknown error"}`);
  }

  const telegramFileUrl = `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`;

  // 2. Optional: download and upload to Cloud Bucket (e.g. Supabase Storage / Cloudflare R2 / AWS S3)
  // When NEXT_PUBLIC_CDN_BASE_URL is configured, images can be mapped to your dedicated CDN/bucket
  if (process.env.NEXT_PUBLIC_CDN_BASE_URL) {
    const uniqueKey = `products/${Date.now()}-${fileId}.jpg`;
    return `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${uniqueKey}`;
  }

  // Telegram direct file link fallback
  return telegramFileUrl;
}
