const { Pool } = require("pg");

async function sanitizeDatabaseImages() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const res = await pool.query('SELECT id, images FROM "Product"');
    console.log(`Checking ${res.rows.length} products for legacy Telegram token URLs...`);

    let updatedCount = 0;
    for (const row of res.rows) {
      if (!Array.isArray(row.images)) continue;

      let changed = false;
      const sanitizedImages = row.images.map((img) => {
        const match = img.match(/^https:\/\/api\.telegram\.org\/file\/bot[^/]+\/(.+)$/);
        if (match) {
          changed = true;
          return `/api/telegram-image?path=${encodeURIComponent(match[1])}`;
        }
        return img;
      });

      if (changed) {
        await pool.query('UPDATE "Product" SET images = $1 WHERE id = $2', [sanitizedImages, row.id]);
        updatedCount++;
      }
    }

    console.log(`Sanitization complete. Updated ${updatedCount} products to use secure proxy URLs.`);
  } catch (err) {
    console.error("Sanitization error:", err);
  } finally {
    await pool.end();
  }
}

sanitizeDatabaseImages();
