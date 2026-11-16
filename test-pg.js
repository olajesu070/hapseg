const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT id, name, category FROM "Product" LIMIT 1')
  .then(res => {
    console.log('SAMPLE PRODUCT:', res.rows[0]);
  })
  .finally(() => pool.end());

