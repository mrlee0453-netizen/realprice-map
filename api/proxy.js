export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const target = req.query.url;
    if (!target) return res.status(400).send('url param required');

    const apiRes = await fetch(target, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const body = await apiRes.text();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    return res.status(200).send(body);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
