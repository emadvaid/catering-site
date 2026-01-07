import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const menuItems = await prisma.menuItem.findMany({
        orderBy: { name: 'asc' }
      });
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Menu API error:', error);
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
