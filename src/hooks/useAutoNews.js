import { useState, useEffect } from 'react';
export // Hook para obtener noticias automÃ¡ticas de varias fuentes (Bypass CORS via RSS2JSON)
function useAutoNews() {
  const [autoNews, setAutoNews] = useState([]);
  const [loadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const CACHE_KEY = 'cardpoint_news_cache_v5';
      const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutos

      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsedCache = JSON.parse(cached);
            setAutoNews(parsedCache.data);
            setLoadingAuto(false);
            if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
              return; // CachÃ© muy reciente, no hacer fetch
            }
          } catch(e) { console.error("Cache read error"); }
        } else {
          setLoadingAuto(true);
        }

        const [resAlpha] = await Promise.allSettled([
          fetch('https://api.rss2json.com/v1/api.json?rss_url=https://pokemonalpha.es/feed/')
        ]);
        
        const parseArticles = async (res, sourceName, limit) => {
          if (res.status === 'fulfilled') {
            try {
              const data = await res.value.json();
              if (data.status === 'ok') {
                return data.items.slice(0, limit).map((item, idx) => {
                  const fallbackImages = [
                    'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=600&auto=format&fit=crop' // Pikachu neon
                  ];
                  let imgUrl = fallbackImages[idx % fallbackImages.length];
                  
                  if (item.thumbnail) {
                    imgUrl = item.thumbnail;
                  } else if (item.content) {
                    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                    const ytMatch = item.content.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                    
                    if (imgMatch && imgMatch[1]) {
                      imgUrl = imgMatch[1];
                    } else if (ytMatch && ytMatch[1]) {
                      imgUrl = `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
                    }
                  }
                  
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = item.description || item.content;
                  const textContent = tempDiv.textContent || tempDiv.innerText || '';
                  const summary = textContent.substring(0, 140).trim() + '...';
                  
                  // Clean dates
                  let dateStr = item.pubDate;
                  if (dateStr.includes(' ')) dateStr = dateStr.split(' ')[0];
                  
                  return {
                    id: `auto-${sourceName.replace(/\s+/g, '')}-${idx}`,
                    title: item.title,
                    date: dateStr,
                    image: imgUrl,
                    summary: summary,
                    content: item.content || item.description || textContent,
                    sourceUrl: item.link,
                    sourceName: sourceName,
                    isExternal: true
                  };
                });
              }
            } catch(e) { console.error("Error parsing feed", sourceName); }
          }
          return [];
        };

        const articlesAlpha = await parseArticles(resAlpha, 'Pokémon Alpha', 10);

        const allArticles = [...articlesAlpha];
        // Ordenar por fecha mÃ¡s reciente
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Eliminar duplicados basados en coincidencias de palabras clave del tÃ­tulo
        const uniqueArticles = [];
        const seenKeywordsSets = [];

        const extractKeywords = (title) => {
          const stopWords = ['para', 'como', 'sobre', 'desde', 'hasta', 'este', 'esta', 'nuevo', 'nueva', 'pokemon', 'pokÃ©mon', 'cartas', 'carta', 'juego', 'coleccion', 'colecciÃ³n'];
          const words = title.toLowerCase().replace(/[^\w\sÃ±Ã¡Ã©Ã­Ã³Ãº]/g, '').split(/\s+/);
          return new Set(words.filter(w => w.length > 3 && !stopWords.includes(w)));
        };

        for (const article of allArticles) {
          const keywords = extractKeywords(article.title);
          let isDuplicate = false;

          for (const seenKeywords of seenKeywordsSets) {
            let overlapCount = 0;
            for (const kw of keywords) {
              if (seenKeywords.has(kw)) overlapCount++;
            }
            // Consideramos duplicado si comparten 2 palabras clave clave o un 60% de similitud
            if (overlapCount >= 2 || (keywords.size > 0 && overlapCount / keywords.size > 0.6)) {
              isDuplicate = true;
              break;
            }
          }

          if (!isDuplicate) {
            uniqueArticles.push(article);
            seenKeywordsSets.push(keywords);
          }
        }
        
        setAutoNews(uniqueArticles);
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: uniqueArticles
        }));
      } catch (err) {
        console.error('Error fetching auto news:', err);
      } finally {
        setLoadingAuto(false);
      }
    };
    fetchNews();
  }, []);

  return { autoNews, loadingAuto };
}
