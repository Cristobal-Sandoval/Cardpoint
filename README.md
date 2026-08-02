# Cardpoint.cl 🃏 (v1.2.0)

Plataforma oficial de **Cardpoint Concepción**, una aplicación web moderna diseñada para la exhibición, catalogación y gestión de cartas sueltas (singles) de **Pokémon TCG** en Chile. 

Este sitio sirve de portal informativo y catálogo en tiempo real, complementando las actividades del perfil de Instagram oficial de [@cardpoint.cl](https://www.instagram.com/cardpoint.cl/).

---

## 🛠️ Tecnologías y Arquitectura del Proyecto

La arquitectura del proyecto está optimizada para la velocidad, la responsividad y una experiencia de usuario premium:

*   **Frontend Core:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (para un empaquetado de producción ultrarrápido y liviano).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (con configuraciones personalizadas de tema y animaciones fluidas).
*   **Suite de Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + [jsdom](https://github.com/jsdom/jsdom) para pruebas unitarias automatizadas (`npm run test`).
*   **Base de Datos y Backend:** [Supabase](https://supabase.com/) (PostgreSQL en tiempo real con políticas RLS de seguridad).
*   **Enrutamiento y Code Splitting:** [React Router v7](https://reactrouter.com/) + Carga perezosa de rutas (`React.lazy` y `<Suspense>`) para segmentar las vistas del cliente y la administración privada.
*   **Carga diferida (Lazy Loading):** Los bundles de páginas pesadas (Buscador API, Catálogo, Noticias, Torneos) se cargan de forma diferida, reduciendo el bundle de inicio bajo los 500 kB.
*   **Monetización Premium:** Componentes dinámicos de publicidad con integración a **Google AdSense** y auto-colapso inteligente para bloques no rellenados (evita desplazamientos CLS).
*   **Cargador de Imágenes:** Integración con la API de **ImgBB** para almacenar fotos reales de las cartas desde el panel administrativo.
*   **Iconografía:** [Lucide React](https://lucide.dev/) (iconos vectoriales de alto rendimiento).

---

## ✨ Características Principales e Implementaciones

### 📦 1. Importador Masivo por Código y Autocompletado (Batch Import Engine)
*   **Importación Solo por Código:** Permite a los administradores importar un lote de cartas ingresando únicamente el **Código de Set y Número** (ej. `TWMla 123/234`, `WHITla 018`, `MegEn 18`), sin necesidad de escribir el nombre de la carta.
*   **Autocompletado Oficial:** El sistema consulta la base de datos oficial de Pokémon TCG y **autocompleta automáticamente** el nombre oficial de la carta, el set/expansión, la rareza traducida y la ilustración.
*   **Ilustraciones Oficiales en Español:** Cuando se ingresa una carta en Español (`la` o `es`), consulta los servidores de Pokémon (`assets.pokemon.com`) para obtener y mostrar la **ilustración oficial en español**, incorporando un mecanismo de respaldo (*fallback*) a alta resolución.
*   **Insensible a Mayúsculas/Minúsculas (Case-Insensitive):** Normalización automática e insensible a capitalización para códigos de set (`TWM`, `twm`, `Twm`), sufijos de idioma (`la`, `es`, `en`, `jp`), condiciones (`NM`, `LP`, `MP`, `HP`, `DMG`), banderas (`holo`, `reverse`, `liga`) y rarezas forzadas (`C`, `U`, `R`, `RR`, `UR`, `IR`, `SIR`, `SD`, `HR`).
*   **Soporte Extendido de Parámetros:** Admite la sintaxis completa en orden:
    ```text
    [CódigoSet], [Número], [Cantidad], [Precio], [Estado], [Rareza], [Reverse/Holo], [Liga]
    Ejemplo: TWMla, 123/234, 1, 5000, NM, UR, holo, liga
    ```
*   **Interfaz de Control Detallada:** Paso 2 de previsualización con tabla interactiva, miniaturas de arte, edición de precios/stock y **checkboxes de selección individual** antes del guardado definitivo en Supabase.

### 🧪 2. Suite de Tests Unitarios (32 Pruebas Automatizadas)
*   **Pruebas de Parser de Importación (`batchImportParser.test.js`):** 14 tests que verifican la extracción de códigos, ceros iniciales, sufijos de idioma, banderas, rarezas forzadas y compatibilidad de formato.
*   **Pruebas de Catálogo y Ordenamiento (`rarityAndSorting.test.js`):** 7 tests que aseguran la correcta normalización de texto y el cumplimiento estricto del algoritmo de prioridades por rareza.
*   **Pruebas de Utilidades (`dateUtils.test.js`):** 5 tests de parseo de fechas en español.
*   **Pruebas de Componentes UI (`components.test.jsx`):** 6 tests que validan el renderizado del logo SVG, insignias de liga, iconos y slots de publicidad AdSense.

### 📰 3. Noticias Automáticas con Imágenes Reales
*   **Fuente RSS:** Consume el feed de **Pokémon Alpha** (`pokemonalpha.es/feed/`) vía `api.rss2json.com`.
*   **Extracción de Imágenes:** Extracción de `og:image` server-side a través de una **Vercel Function** (`/api/og-proxy`) y middleware local de Vite.
*   **Fallback Inteligente:** Asignación de pool de imágenes únicas de respaldo sin duplicados entre noticias.
*   **Noticias Base:** Contenido predefinido de Pokémon oficial y TCG News.
*   **Editor de Noticias:** Panel administrativo para sustituir la imagen de cualquier noticia con almacenamiento en Supabase.

### 🔍 4. Catálogo y Stock Físico Inteligente
*   **Ordenamiento por Rarity (Default):** Ordenamiento predeterminado priorizando rarezas superiores (*Hyper Raras*, *Secretas Doradas*, *Ultra Raras Secreta*, *Ilustración Rara*, etc.), seguidas por *Ultra Raras*, *Raras*, *Doble Raras*, y finalmente cartas *Comunes*. Si coinciden en rareza, se ordenan por precio de mayor a menor.
*   **Filtros de Rareza Adaptativos:** Ocultación automática de botones de filtro para rarezas que no cuentan con stock disponible en la base de datos.
*   **Scroll Reset en Paginación:** Desplazamiento suave automático al inicio de la grilla de cartas al cambiar de página con margen para el menú fijo (*sticky header*).

### 🚀 5. Optimización de Rendimiento (Web Vitals) y SEO
*   **Preconexión DNS/TCP:** Optimización para `images.pokemontcg.io` y `assets.pokemon.com`.
*   **Metadatos Sociales Dinámicos:** Hook `useSEO` para etiquetas OpenGraph y Twitter Cards en tiempo real.
*   **AdSense Auto-Collapse:** Integración CSS con reglas `:has(...)` para auto-colapsar espacios publicitarios no rellenados sin afectar la maquetación.
*   **Respeto de Safe Area & SEO Estático:** Archivos `robots.txt`, `sitemap.xml` y soporte para `env(safe-area-inset-*)`.

---

## 🚀 Instalación, Pruebas y Desarrollo Local

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/Cristobal-Sandoval/Cardpoint.git
    cd Cardpoint
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Ejecutar Suite de Tests Unitarios:**
    ```bash
    npm run test
    ```

5.  **Generar Compilación de Producción:**
    ```bash
    npm run build
    ```

---

## 👥 Contacto y Soporte

Desarrollado y mantenido para la comunidad chilena de coleccionistas y jugadores competitivos de Pokémon TCG. 

> [!IMPORTANT]
> **Canal Oficial de Contacto:**
> Para resolver cualquier tipo de duda, coordinar compras del catálogo, enviar decklists o realizar consultas comerciales, el **único canal oficial disponible** es nuestro perfil de **[Instagram Oficial @cardpoint.cl](https://www.instagram.com/cardpoint.cl/)**. No se atienden requerimientos por otros medios.

---

*Este proyecto fue desarrollado íntegramente por **CardPoint**.*
