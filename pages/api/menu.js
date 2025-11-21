import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const role = req.headers['x-role'] || '';

  if (req.method === 'GET') {
    try {
      const menu = await prisma.menuItem.findMany();
      return res.status(200).json(menu);
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
      const item = req.body;
      const newItem = await prisma.menuItem.create({ data: item });
      return res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const item = req.body;
      const updatedItem = await prisma.menuItem.update({
        where: { id: item.id },
        data: item,
      });
      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'not found' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.menuItem.delete({ where: { id } });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'not found' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}
