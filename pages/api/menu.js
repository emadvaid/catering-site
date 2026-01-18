import menuData from '../../data/menu.json';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return static menu data (with images) until DB is populated
    return res.status(200).json(menuData);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
