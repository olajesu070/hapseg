const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Classic Vintage Leather Biker Jacket',
          description: 'Handcrafted premium full-grain leather with asymmetrical metal zipper, quilted shoulder accents, and soft inner lining. Designed for lifetime durability.',
          price: 185.00,
          itemNo: 'JKT-01',
          phoneNumber: '2347030700000',
          category: 'fashion',
          images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop'
          ]
        },
        {
          name: 'Minimalist Chef Ceramic Knife Set',
          description: 'Ultra-sharp zirconium oxide blades with anti-slip ergonomic silicone handles. Resistant to rust, acids, and stains. Includes 4 knives and matching blade guards.',
          price: 64.99,
          itemNo: 'KNF-88',
          phoneNumber: '2347030700000',
          category: 'kitchen',
          images: [
            'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop'
          ]
        },
        {
          name: 'Portable Smart Desk Diffuser & Humidifier',
          description: 'Quiet ultrasonic cool mist humidifier with soothing 7-color warm ambient LED ring, auto shutoff sensor, and USB-C fast power.',
          price: 32.50,
          itemNo: 'VAR-12',
          phoneNumber: '2347030700000',
          category: 'varieties',
          images: [
            'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop'
          ]
        }
      ]
    });
    console.log('Seeded demo products for instant UI verification');
  } else {
    console.log('Database already has products count:', count);
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
