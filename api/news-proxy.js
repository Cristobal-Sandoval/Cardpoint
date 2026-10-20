import { fetchGuardedText } from '../server/urlGuard.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const { response, text } = await fetchGuardedText(url);

    if (!response.ok) {
      return res.status(502).json({ error: `Upstream returned ${response.status}` });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return res.status(415).json({ error: 'Unsupported content type' });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(text);
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Failed to fetch upstream' });
  }
}
