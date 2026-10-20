import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchGuardedText } from './server/urlGuard.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'news-proxy-dev',
      configureServer(server) {
        server.middlewares.use('/api/og-proxy', async (req, res) => {
          const url = new URL(req.url, 'http://localhost').searchParams.get('url');
          if (!url) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing url parameter' }));
            return;
          }
          try {
            const { response, text } = await fetchGuardedText(url);
            if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
            const match = text.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
            if (match && /^https?:\/\//i.test(match[1])) {
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400'
              });
              res.end(JSON.stringify({ image: match[1] }));
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'No og:image found' }));
            }
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });

        server.middlewares.use('/api/news-proxy', async (req, res) => {
          const url = new URL(req.url, 'http://localhost').searchParams.get('url');
          if (!url) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing url parameter' }));
            return;
          }
          try {
            const { response, text } = await fetchGuardedText(url);
            if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=1800'
            });
            res.end(text);
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      }
    }
  ],
})
