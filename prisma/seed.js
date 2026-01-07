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

  // Add menu items with images - International Cuisine
  // Asian
  await prisma.menuItem.create({ data: { name: 'Pad Thai Noodles', price: 450, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Vietnamese Spring Rolls', price: 350, image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Korean BBQ Platter', price: 850, image: 'https://images.unsplash.com/photo-1568096889942-6eedde686635?w=800&h=600&fit=crop' } });
  
  // BBQ / American
  await prisma.menuItem.create({ data: { name: 'Smoked BBQ Ribs', price: 950, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Pulled Pork Sandwiches', price: 550, image: 'https://images.unsplash.com/photo-1619221882461-0319d4e96380?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Grilled Chicken Wings', price: 650, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=600&fit=crop' } });
  
  // Breakfast
  await prisma.menuItem.create({ data: { name: 'Continental Breakfast Box', price: 400, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Pancake Stack Platter', price: 380, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop' } });
  
  // Healthy
  await prisma.menuItem.create({ data: { name: 'Mediterranean Quinoa Bowl', price: 420, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Greek Salad Platter', price: 380, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop' } });
  
  // Italian
  await prisma.menuItem.create({ data: { name: 'Fettuccine Alfredo', price: 520, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Margherita Pizza', price: 480, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Lasagna Tray', price: 720, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop' } });
  
  // Mediterranean
  await prisma.menuItem.create({ data: { name: 'Mezze Platter', price: 580, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Falafel Wraps', price: 420, image: 'https://images.unsplash.com/photo-1626074353765-517a65e8f228?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Shawarma Platter', price: 680, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&h=600&fit=crop' } });
  
  // Mexican
  await prisma.menuItem.create({ data: { name: 'Taco Bar Box', price: 620, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Burrito Bowls', price: 550, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop' } });
  
  // Pizza
  await prisma.menuItem.create({ data: { name: 'Pepperoni Pizza Party Pack', price: 850, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Gourmet Pizza Selection', price: 950, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop' } });
  
  // Sandwiches
  await prisma.menuItem.create({ data: { name: 'Deli Sandwich Platter', price: 480, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Panini Assortment', price: 520, image: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=800&h=600&fit=crop' } });
  
  // Desserts
  await prisma.menuItem.create({ data: { name: 'Chocolate Brownie Tray', price: 380, image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Tiramisu Cups', price: 420, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop' } });
  await prisma.menuItem.create({ data: { name: 'Fruit Tart Selection', price: 450, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop' } });

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