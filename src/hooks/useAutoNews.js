import { useState, useEffect } from 'react';

// Hook para obtener noticias TCG desde tcgnews.cl
function useAutoNews() {
  const [autoNews, setAutoNews] = useState([]);
  const [loadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const CACHE_KEY = 'cardpoint_news_tcg_v3';
      const CACHE_EXPIRY = 20 * 60 * 1000; // 20 minutos

      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          if (parsedCache.data && parsedCache.data.length > 0) {
            setAutoNews(parsedCache.data);
            setLoadingAuto(false);
            if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
              return; // Cache reciente
            }
          }
        }
      } catch(e) { /* cache corrupta, ignorar */ }

      const TARGET_URL = 'https://www.tcgnews.cl/buscador/categoria/pokemon-tcg';

      // Lista de proxies CORS a intentar en orden
      const PROXIES = [
        (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      ];

      const fetchWithTimeout = async (url, ms = 10000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), ms);
        try {
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(id);
          return res;
        } catch (e) {
          clearTimeout(id);
          throw e;
        }
      };

      const parseHTML = (html) => {
        if (!html || html.length < 100) return [];

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleDivs = doc.querySelectorAll('.grid_noti_resumen2');

        const articles = [];
        let idx = 0;

        for (const div of articleDivs) {
          const linkEl  = div.querySelector('a.tit_noti_resumen3');
          const imgEl   = div.querySelector('img.img_noti_resumen');
          const sumEl   = div.querySelector('.txt_noti_resumen2');
          const dateEl  = div.querySelector('.fecha_noti_resumen2');

          if (!linkEl) continue;

          const title   = linkEl.textContent?.trim() || '';
          const href    = linkEl.getAttribute('href') || '';
          const imgSrc  = imgEl?.getAttribute('src') || '';
          const summary = sumEl?.textContent?.trim() || '';
          const dateRaw = dateEl?.textContent || '';

          // Convertir "Hace X días/horas" a fecha ISO aproximada
          const dateMatch = dateRaw.match(/Hace\s+(\d+)\s+(hora|horas|d[íi]a|d[íi]as|semana|semanas)/i);
          let date = new Date();
          if (dateMatch) {
            const n = parseInt(dateMatch[1], 10);
            const unit = dateMatch[2].toLowerCase();
            if (unit.startsWith('hora'))   date = new Date(Date.now() - n * 3600000);
            if (unit.startsWith('d'))      date = new Date(Date.now() - n * 86400000);
            if (unit.startsWith('semana')) date = new Date(Date.now() - n * 604800000);
          }

          const fullImg = imgSrc.startsWith('http') ? imgSrc : `https://www.tcgnews.cl${imgSrc}`;
          const fullUrl = href.startsWith('http') ? href : `https://www.tcgnews.cl${href}`;

          articles.push({
            id: `tcgnews-${idx++}`,
            title,
            date: date.toISOString().split('T')[0],
            image: fullImg,
            summary: summary || title,
            content: summary,
            sourceUrl: fullUrl,
            sourceName: 'Noticias TCG',
            isExternal: true
          });
        }

        return articles;
      };

      // Intentar cada proxy
      for (const makeUrl of PROXIES) {
        try {
          const proxyUrl = makeUrl(TARGET_URL);
          const res = await fetchWithTimeout(proxyUrl, 10000);

          if (!res.ok) continue;

          let html = '';
          const ct = res.headers.get('content-type') || '';

          if (ct.includes('application/json')) {
            const json = await res.json();
            // allorigins devuelve { contents: "..." }
            html = json.contents || json.data || '';
          } else {
            html = await res.text();
          }

          const articles = parseHTML(html);
          if (articles.length > 0) {
            setAutoNews(articles);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: articles
            }));
            break; // Exito, no necesitamos más proxies
          }
        } catch (e) {
          console.warn('Proxy failed, trying next...', e.message);
          continue;
        }
      }
    };

    fetchNews().finally(() => setLoadingAuto(false));
  }, []);

  return { autoNews, loadingAuto };
}

export default useAutoNews;
export { useAutoNews };
