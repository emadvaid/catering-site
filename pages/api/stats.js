import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const role = req.headers['x-role'] || '';
  if (!['owner', 'root'].includes(role)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      include: { items: true },
    });

    const totalRevenue = invoices.reduce((sum, inv) => sum + (parseFloat(inv.total) || 0), 0);
    const totalOrders = invoices.length;
    
    // Customer analytics
    const customerMap = new Map();
    invoices.forEach((inv) => {
      const count = customerMap.get(inv.customer) || 0;
      customerMap.set(inv.customer, count + 1);
    });
    const totalCustomers = customerMap.size;
    const newCustomers = Array.from(customerMap.values()).filter(count => count === 1).length;
    const repeatCustomers = totalCustomers - newCustomers;

    // Item analytics
    const itemMap = {};
    invoices.forEach((inv) => {
      (inv.items || []).forEach((it) => {
        const name = it.name || 'Unknown';
        const qty = parseFloat(it.qty) || 0;
        const revenue = (parseFloat(it.unitPrice) || 0) * qty;
        if (!itemMap[name]) itemMap[name] = { name, qty: 0, revenue: 0 };
        itemMap[name].qty += qty;
        itemMap[name].revenue += revenue;
      });
    });
    const topItems = Object.values(itemMap).sort((a, b) => b.qty - a.qty);

    // Monthly analytics
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthRevenue = 0;
    let lastMonthRevenue = 0;
    let currentMonthOrders = 0;
    let lastMonthOrders = 0;

    const monthlyData = {};

    invoices.forEach((inv) => {
      const date = inv.createdAt ? new Date(inv.createdAt) : new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      const revenue = parseFloat(inv.total) || 0;

      // Current and last month
      if (year === currentYear && month === currentMonth) {
        currentMonthRevenue += revenue;
        currentMonthOrders++;
      }
      if (year === lastMonthYear && month === lastMonth) {
        lastMonthRevenue += revenue;
        lastMonthOrders++;
      }

      // Monthly breakdown
      const key = `${year}-${String(month + 1).padStart(2, '0')}`;
      if (!monthlyData[key]) monthlyData[key] = { month: key, revenue: 0, orders: 0 };
      monthlyData[key].revenue += revenue;
      monthlyData[key].orders++;
    });

    const monthlyBreakdown = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      newCustomers,
      repeatCustomers,
      currentMonthRevenue,
      lastMonthRevenue,
      currentMonthOrders,
      lastMonthOrders,
      topItems,
      monthlyBreakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
