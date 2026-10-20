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

    const match = text.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

    if (match && /^https?:\/\//i.test(match[1])) {
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.status(200).json({ image: match[1] });
    }

    return res.status(404).json({ error: 'No og:image found' });
  } catch (error) {
    const status = error.message === 'Host not allowed' || error.message === 'Only HTTPS URLs are allowed' ? 400 : 502;
    return res.status(status).json({ error: error.message || 'Failed to fetch upstream' });
  }
}
