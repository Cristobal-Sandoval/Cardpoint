import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'og-proxy-dev',
      configureServer(server) {
        server.middlewares.use('/api/og-proxy', async (req, res) => {
          const url = new URL(req.url, 'http://localhost').searchParams.get('url');
          if (!url) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing url parameter' }));
            return;
          }
          try {
            new URL(url);
          } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid URL' }));
            return;
          }
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const response = await fetch(url, {
              signal: controller.signal,
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            clearTimeout(timeout);
            if (!response.ok) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Upstream returned ${response.status}` }));
              return;
            }
            const html = await response.text();
            const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
            if (match) {
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400'
              });
              res.end(JSON.stringify({ image: match[1] }));
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'No og:image found' }));
            }
          } catch {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch upstream' }));
          }
        });
      }
    }
  ],
})
