import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany({
        include: {
          customer: true,
          items: {
            include: {
              menuItem: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Invoices API error:', error);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
