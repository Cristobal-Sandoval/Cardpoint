import { useState, useEffect } from 'react';

// Hook para obtener noticias TCG de tcgnews.cl (via proxy CORS)
function useAutoNews() {
  const [autoNews, setAutoNews] = useState([]);
  const [loadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const CACHE_KEY = 'cardpoint_news_tcg_v2';
      const CACHE_EXPIRY = 20 * 60 * 1000; // 20 minutos

      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsedCache = JSON.parse(cached);
            setAutoNews(parsedCache.data);
            setLoadingAuto(false);
            if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
              return; // Cache reciente, no hacer fetch
            }
          } catch(e) { /* cache corrupta, seguir */ }
        } else {
          setLoadingAuto(true);
        }

        // Fetch via allorigins CORS proxy
        const TARGET_URL = 'https://www.tcgnews.cl/buscador/categoria/pokemon-tcg';
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(TARGET_URL)}`;

        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(12000) });
        const json = await res.json();
        const html = json.contents || '';

        if (!html) throw new Error('No se pudo obtener contenido de TCGNews');

        // Parse articles from HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const articleDivs = doc.querySelectorAll('.grid_noti_resumen2');
        const articles = [];
        let idx = 0;

        for (const div of articleDivs) {
          const linkEl   = div.querySelector('a.tit_noti_resumen3');
          const imgEl    = div.querySelector('img.img_noti_resumen');
          const sumEl    = div.querySelector('.txt_noti_resumen2');
          const dateEl   = div.querySelector('.fecha_noti_resumen2');

          if (!linkEl) continue;

          const title   = linkEl.textContent?.trim() || '';
          const url     = linkEl.getAttribute('href') || '';
          const imgSrc  = imgEl?.getAttribute('src') || '';
          const summary = sumEl?.textContent?.trim() || '';
          const dateRaw = dateEl?.textContent?.trim() || '';

          // Convert "Hace X días/horas" to approximate ISO date
          const dateMatch = dateRaw.match(/Hace\s+(\d+)\s+(hora|horas|día|días|semana|semanas)/i);
          let date = new Date();
          if (dateMatch) {
            const n = parseInt(dateMatch[1]);
            const unit = dateMatch[2].toLowerCase();
            if (unit.startsWith('hora'))   date = new Date(Date.now() - n * 3600000);
            if (unit.startsWith('día'))    date = new Date(Date.now() - n * 86400000);
            if (unit.startsWith('semana')) date = new Date(Date.now() - n * 604800000);
          }

          articles.push({
            id: `tcgnews-${idx++}`,
            title,
            date: date.toISOString().split('T')[0],
            image: imgSrc.startsWith('http') ? imgSrc : `https://www.tcgnews.cl${imgSrc}`,
            summary: summary || title,
            content: summary,
            sourceUrl: url.startsWith('http') ? url : `https://www.tcgnews.cl${url}`,
            sourceName: 'Noticias TCG',
            isExternal: true
          });
        }

        if (articles.length > 0) {
          setAutoNews(articles);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: articles
          }));
        }

      } catch (err) {
        console.error('Error fetching TCGNews:', err);
        // On error, keep any cached data we already set
      } finally {
        setLoadingAuto(false);
      }
    };

    fetchNews();
  }, []);

  return { autoNews, loadingAuto };
}

export default useAutoNews;
export { useAutoNews };
