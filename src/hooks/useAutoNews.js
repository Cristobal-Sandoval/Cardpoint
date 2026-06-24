import { useState, useEffect } from 'react';

const FALLBACK_NEWS = [
  {
    "id": "tcgnews-fallback-0",
    "title": "Pokémon TCG Pocket: Maravillas Cotidianas, la expansión donde los Pokémon descansan y disfrutan",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/330/mediana.avif",
    "summary": "Maravillas Cotidianas es una expansión de Pokémon TCG Pocket centrada en cartas con ilustraciones tiernas y relajadas de Pikachu, Piplup, Snorlax, Greedent y Sylveon.",
    "content": "Maravillas Cotidianas es una expansión de Pokémon TCG Pocket centrada en cartas con ilustraciones tiernas y relajadas de Pikachu, Piplup, Snorlax, Greedent y Sylveon.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/pokemon-tcg-pocket-maravillas-cotidianas-la-expansion-donde-los-pokemon-descansan-y-disfrutan",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-1",
    "title": "Un nuevo registro en Japón vuelve a poner al Team Rocket en el radar de Pokémon",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/328/mediana.avif",
    "summary": "Un nuevo registro de marca en Japón relacionado con el Team Rocket abrió preguntas entre jugadores y coleccionistas, aunque por ahora no existe anuncio oficial de una nueva expansión de Pokémon TCG.",
    "content": "Un nuevo registro de marca en Japón relacionado con el Team Rocket abrió preguntas entre jugadores y coleccionistas, aunque por ahora no existe anuncio oficial de una nueva expansión de Pokémon TCG.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/un-nuevo-registro-en-japon-vuelve-a-poner-al-team-rocket-en-el-radar-de-pokemon",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-2",
    "title": "Mega Rayquaza lidera el adelanto de nuevas expansiones de Pokémon TCG",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/322/mediana.avif",
    "summary": "Pokémon compartió un nuevo adelanto oficial protagonizado por Mega Rayquaza, conectando próximos lanzamientos de Pokémon TCG Pocket and del TCG físico.",
    "content": "Pokémon compartió un nuevo adelanto oficial protagonizado por Mega Rayquaza, conectando próximos lanzamientos de Pokémon TCG Pocket and del TCG físico.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/mega-rayquaza-lidera-el-adelanto-de-nuevas-expansiones-de-pokemon-tcg",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-3",
    "title": "James Kowalski gana el NAIC 2026 de Pokémon TCG con Lillie’s Clefairy",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/317/mediana.avif",
    "summary": "El jugador estadounidense se coronó campeón Masters en New Orleans, en un Top 8 marcado por la fuerte presencia de Dragapult antes del Mundial Pokémon 2026.",
    "content": "El jugador estadounidense se coronó campeón Masters en New Orleans, en un Top 8 marcado por la fuerte presencia de Dragapult antes del Mundial Pokémon 2026.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/james-kowalski-gana-el-naic-2026-de-pokemon-tcg-con-lillie-s-clefairy",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-4",
    "title": "Ceruledge ex protagoniza un nuevo evento botín en Pokémon TCG Pocket",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/315/mediana.avif",
    "summary": "El evento estará disponible del 13 al 23 de junio y permitirá conseguir sobres promocionales mediante combates individuales dentro del juego.",
    "content": "El evento estará disponible del 13 al 23 de junio y permitirá conseguir sobres promocionales mediante combates individuales dentro del juego.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/ceruledge-ex-protagoniza-un-nuevo-evento-botin-en-pokemon-tcg-pocket",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-5",
    "title": "NAIC 2026: 30 jugadores chilenos dicen presente en Pokémon TCG",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/314/mediana.avif",
    "summary": "El North America International Championships se disputa del 12 al 14 de junio en New Orleans, con presencia chilena en Pokémon TCG y transmisión oficial durante el fin de semana.",
    "content": "El North America International Championships se disputa del 12 al 14 de junio en New Orleans, con presencia chilena en Pokémon TCG y transmisión oficial durante el fin de semana.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/naic-2026-29-jugadores-chilenos-dicen-presente-en-pokemon-tcg",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-6",
    "title": "Qué son los Prize Pack Series 9 de Pokémon TCG y cómo conseguirlos",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/310/mediana.avif",
    "summary": "La nueva serie de sobres de premio de Play! Pokémon incluirá cartas con sello especial, más de 100 cartas seleccionadas y recompensas para jugadores que participen en eventos locales.",
    "content": "La nueva serie de sobres de premio de Play! Pokémon incluirá cartas con sello especial, más de 100 cartas seleccionadas y recompensas para jugadores que participen en eventos locales.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/que-son-los-prize-pack-series-9-de-pokemon-tcg-y-como-conseguirlos",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-7",
    "title": "Pokémon TCG revela nuevas cartas y promos para el prelanzamiento de Pitch Black",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/309/mediana.avif",
    "summary": "Pokémon TCG reveló nuevas cartas y promos de Pitch Black (Tinieblas Umbrías) para sus eventos de prelanzamiento desde el 4 de julio.",
    "content": "Pokémon TCG reveló nuevas cartas y promos de Pitch Black (Tinieblas Umbrías) para sus eventos de prelanzamiento desde el 4 de julio.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/pokemon-tcg-revela-nuevas-cartas-y-promos-para-el-prelanzamiento-de-pitch-black",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-8",
    "title": "Pikachu ex, Espeon ex y Umbreon ex se suman a Pokémon TCG: 30th Celebration",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/308/mediana.avif",
    "summary": "Durante el Japan Championships se revelaron nuevas cartas y productos asociados al aniversario 30 de Pokémon TCG, incluyendo dos Pikachu ex con estilo Futuristic Rare.",
    "content": "Durante el Japan Championships se revelaron nuevas cartas y productos asociados al aniversario 30 de Pokémon TCG, incluyendo dos Pikachu ex con estilo Futuristic Rare.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/pikachu-ex-espeon-ex-y-umbreon-ex-se-suman-a-pokemon-tcg-30th-celebration",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-9",
    "title": "Pokémon TCG Live cumple tres años con recompensas y eventos temporales",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/305/mediana.avif",
    "summary": "La plataforma digital habilitó regalos por inicio de sesión, cartas especiales de Bulbasaur, Ivysaur y Venusaur, además de códigos que se publicarán durante junio.",
    "content": "La plataforma digital habilitó regalos por inicio de sesión, cartas especiales de Bulbasaur, Ivysaur y Venusaur, además de códigos que se publicarán durante junio.",
    "sourceUrl": "https://www.tcgnews.cl/noticia/pokemon-tcg-live-cumple-tres-anos-con-recompensas-y-eventos-temporales",
    "sourceName": "Noticias TCG",
    "isExternal": true
  }
];

export function useAutoNews() {
  const [autoNews, setAutoNews] = useState([]);
  const [loadingAuto, setLoadingAuto] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const CACHE_KEY = 'cardpoint_news_tcg_v4';
      const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutos

      // Intentar cargar caché
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          if (parsedCache.data && parsedCache.data.length > 0) {
            setAutoNews(parsedCache.data);
            setLoadingAuto(false);
            if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
              console.log("useAutoNews: Cargada caché reciente de noticias");
              return;
            }
          }
        }
      } catch(e) {
        console.warn("useAutoNews: Error leyendo caché:", e);
      }

      const TARGET_URL = 'https://www.tcgnews.cl/buscador/categoria/pokemon-tcg';
      
      // Lista de proxies CORS con formato correcto
      const PROXIES = [
        (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
      ];

      const fetchWithTimeout = async (url, ms = 8000) => {
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
          const linkEl = div.querySelector('a.tit_noti_resumen3');
          const imgEl = div.querySelector('img.img_noti_resumen');
          const sumEl = div.querySelector('.txt_noti_resumen2');
          const dateEl = div.querySelector('.fecha_noti_resumen2');
          
          if (!linkEl) continue;
          
          const title = linkEl.textContent?.trim() || '';
          const href = linkEl.getAttribute('href') || '';
          const imgSrc = imgEl?.getAttribute('src') || '';
          const summary = sumEl?.textContent?.trim() || '';
          
          let dateText = dateEl?.textContent || '';
          dateText = dateText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          dateText = dateText.split('|').pop().trim();
          
          let date = new Date();
          const dateMatch = dateText.match(/Hace\s+(\d+)\s+(hora|horas|día|días|semana|semanas|mes|meses)/i);
          if (dateMatch) {
            const n = parseInt(dateMatch[1], 10);
            const unit = dateMatch[2].toLowerCase();
            if (unit.startsWith('hora'))   date = new Date(Date.now() - n * 3600000);
            if (unit.startsWith('d') || unit.startsWith('dí'))      date = new Date(Date.now() - n * 86400000);
            if (unit.startsWith('semana')) date = new Date(Date.now() - n * 604800000);
            if (unit.startsWith('mes'))    date = new Date(Date.now() - n * 2592000000);
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

      let success = false;
      
      for (const makeUrl of PROXIES) {
        try {
          const proxyUrl = makeUrl(TARGET_URL);
          console.log(`useAutoNews: Intentando proxy ${proxyUrl}`);
          const res = await fetchWithTimeout(proxyUrl, 8000);
          if (!res.ok) continue;
          
          let html = '';
          const contentType = res.headers.get('content-type') || '';
          
          if (contentType.includes('application/json')) {
            const json = await res.json();
            html = json.contents || json.data || '';
          } else {
            html = await res.text();
          }
          
          const articles = parseHTML(html);
          if (articles && articles.length > 0) {
            console.log(`useAutoNews: Éxito al obtener ${articles.length} noticias desde tcgnews.cl`);
            setAutoNews(articles);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data: articles
            }));
            success = true;
            break;
          }
        } catch (e) {
          console.warn(`useAutoNews: Falló proxy:`, e.message);
        }
      }

      // Si todos los proxies fallaron (por Cloudflare/CORS) y no hay datos en caché, usar fallback pre-scraped
      if (!success) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) {
          console.log("useAutoNews: Todos los proxies fallaron y no hay caché. Cargando noticias de fallback.");
          setAutoNews(FALLBACK_NEWS);
        }
      }
    };

    fetchNews().finally(() => setLoadingAuto(false));
  }, []);

  return { autoNews, loadingAuto };
}

export default useAutoNews;
