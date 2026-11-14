const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT COUNT(*) FROM "Product"')
  .then(res => {
    console.log('PG POOL SUCCESS: count =', res.rows[0].count);
    return pool.query('SELECT name, price, category FROM "Product" ORDER BY "createdAt" DESC LIMIT 5');
  })
  .then(res => {
    console.log('Top 5 items in DB:');
    res.rows.forEach(r => console.log(`- ${r.name} | N${r.price} | ${r.category}`));
  })
  .catch(err => {
    console.error('PG POOL ERROR:', err);
  })
  .finally(() => pool.end());
