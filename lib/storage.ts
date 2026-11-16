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

  // 2. Return secure proxy path or cloud CDN URL (never expose TELEGRAM_BOT_TOKEN)
  if (process.env.NEXT_PUBLIC_CDN_BASE_URL) {
    const uniqueKey = `products/${Date.now()}-${fileId}.jpg`;
    return `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${uniqueKey}`;
  }

  // Use local secure proxy route to shield TELEGRAM_BOT_TOKEN from client exposure
  return `/api/telegram-image?path=${encodeURIComponent(fileData.result.file_path)}`;
}
