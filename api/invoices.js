import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const role = req.headers['x-role'] || '';

  if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany({
        include: { items: true },
      });
      return res.status(200).json(invoices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (!['owner', 'root'].includes(role)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  if (req.method === 'POST') {
    try {
      const invoice = req.body;
      const newInvoice = await prisma.invoice.create({
        data: {
          ...invoice,
          items: {
            create: invoice.items,
          },
        },
      });
      return res.status(201).json(newInvoice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
