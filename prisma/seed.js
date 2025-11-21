const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Delete existing users to avoid duplicates
  await prisma.user.deleteMany({});

  // Password hash for 'password'
  const passwordHash = bcrypt.hashSync('password', 10);

  // Add users with hashed passwords
  await prisma.user.create({ data: { name: 'Admin', email: 'admin+1@example.com', role: 'root', password: passwordHash } });
  await prisma.user.create({ data: { name: 'Owner', email: 'owner+1@example.com', role: 'owner', password: passwordHash } });
  await prisma.user.create({ data: { name: 'Customer', email: 'customer+1@example.com', role: 'customer', password: passwordHash } });

  // Add menu items with images
  await prisma.menuItem.create({ data: { name: 'Chicken Biryani', price: 500, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' } });
  await prisma.menuItem.create({ data: { name: 'Mutton Karahi', price: 1200, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500' } });
  await prisma.menuItem.create({ data: { name: 'Beef Nihari', price: 800, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500' } });
  await prisma.menuItem.create({ data: { name: 'Seekh Kebabs', price: 600, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500' } });
  await prisma.menuItem.create({ data: { name: 'Chicken Tikka', price: 700, image: 'https://images.unsplash.com/photo-1599520465781-a67d60c5bf5f?w=500' } });

  // Add invoices with varied dates for analytics
  const now = new Date();
  
  // Current month invoices
  await prisma.invoice.create({
    data: {
      customer: 'John Doe',
      total: 2500,
      createdAt: new Date(now.getFullYear(), now.getMonth(), 5),
      items: {
        create: [
          { name: 'Chicken Biryani', qty: 2, unitPrice: 500 },
          { name: 'Mutton Karahi', qty: 1, unitPrice: 1200 },
          { name: 'Seekh Kebabs', qty: 2, unitPrice: 300 },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      customer: 'Jane Smith',
      total: 1400,
      createdAt: new Date(now.getFullYear(), now.getMonth(), 12),
      items: {
        create: [
          { name: 'Beef Nihari', qty: 1, unitPrice: 800 },
          { name: 'Seekh Kebabs', qty: 1, unitPrice: 600 },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      customer: 'John Doe',
      total: 1900,
      createdAt: new Date(now.getFullYear(), now.getMonth(), 18),
      items: {
        create: [
          { name: 'Chicken Tikka', qty: 2, unitPrice: 700 },
          { name: 'Chicken Biryani', qty: 1, unitPrice: 500 },
        ],
      },
    },
  });

  // Last month invoices
  const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  await prisma.invoice.create({
    data: {
      customer: 'Alice Johnson',
      total: 3200,
      createdAt: new Date(lastMonthYear, lastMonth, 8),
      items: {
        create: [
          { name: 'Mutton Karahi', qty: 2, unitPrice: 1200 },
          { name: 'Chicken Biryani', qty: 1, unitPrice: 500 },
          { name: 'Seekh Kebabs', qty: 2, unitPrice: 300 },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      customer: 'Bob Williams',
      total: 1500,
      createdAt: new Date(lastMonthYear, lastMonth, 15),
      items: {
        create: [
          { name: 'Beef Nihari', qty: 1, unitPrice: 800 },
          { name: 'Chicken Tikka', qty: 1, unitPrice: 700 },
        ],
      },
    },
  });

  await prisma.invoice.create({
    data: {
      customer: 'Jane Smith',
      total: 2400,
      createdAt: new Date(lastMonthYear, lastMonth, 22),
      items: {
        create: [
          { name: 'Mutton Karahi', qty: 1, unitPrice: 1200 },
          { name: 'Chicken Biryani', qty: 2, unitPrice: 500 },
          { name: 'Seekh Kebabs', qty: 2, unitPrice: 300 },
        ],
      },
    },
  });

  // Two months ago
  const twoMonthsAgo = lastMonth === 0 ? 11 : lastMonth - 1;
  const twoMonthsAgoYear = lastMonth === 0 ? lastMonthYear - 1 : lastMonthYear;

  await prisma.invoice.create({
    data: {
      customer: 'Charlie Brown',
      total: 1700,
      createdAt: new Date(twoMonthsAgoYear, twoMonthsAgo, 10),
      items: {
        create: [
          { name: 'Chicken Biryani', qty: 2, unitPrice: 500 },
          { name: 'Chicken Tikka', qty: 1, unitPrice: 700 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });