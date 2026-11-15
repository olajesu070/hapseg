const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  const contactHtml = await fetch('https://hapsegstore.com/contact-us/');
  const aboutHtml = await fetch('https://hapsegstore.com/about-us/');
  
  console.log('=== CONTACT RAW META ===');
  const cMatch = contactHtml.match(/name="description"\s+content="([^"]+)"/);
  if (cMatch) console.log(cMatch[1]);

  console.log('=== ABOUT RAW META ===');
  const aMatch = aboutHtml.match(/name="description"\s+content="([^"]+)"/);
  if (aMatch) console.log(aMatch[1]);
}

scrape();
