import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  const { role } = req.headers;

  if (!role || !['owner', 'root'].includes(role)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    // Get overall statistics
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: { total: true }
    });

    const totalOrders = await prisma.invoice.count();

    const totalCustomers = await prisma.user.count({
      where: { role: 'customer' }
    });

    // Get top selling items
    const topItems = await prisma.invoiceItem.groupBy({
      by: ['menuItemId'],
      _sum: {
        quantity: true,
        subtotal: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    });

    // Fetch menu item details for top items
    const topItemsWithDetails = await Promise.all(
      topItems.map(async (item) => {
        const menuItem = await prisma.menuItem.findUnique({
          where: { id: item.menuItemId }
        });
        return {
          name: menuItem?.name,
          qty: item._sum.quantity,
          revenue: item._sum.subtotal
        };
      })
    );

    res.status(200).json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders,
      totalCustomers,
      topItems: topItemsWithDetails,
      newCustomers: 0,
      repeatCustomers: 0,
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
      currentMonthOrders: 0,
      lastMonthOrders: 0
    });
  } catch (error) {
    console.error('Stats API error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
}
