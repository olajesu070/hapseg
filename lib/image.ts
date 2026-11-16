/**
 * Normalizes product image URLs.
 * If a legacy image contains a raw Telegram Bot URL, strips the token and
 * points to the secure internal proxy endpoint to prevent leaking credentials.
 */
export function formatProductImageUrl(rawUrl: string | null | undefined): string {
  if (!rawUrl) {
    return "https://placehold.co/600x600/f8fafc/94a3b8?text=HAPSEG";
  }

  // Intercept legacy raw Telegram URLs containing bot token
  const telegramMatch = rawUrl.match(/^https:\/\/api\.telegram\.org\/file\/bot[^/]+\/(.+)$/);
  if (telegramMatch) {
    return `/api/telegram-image?path=${encodeURIComponent(telegramMatch[1])}`;
  }

  return rawUrl;
}
