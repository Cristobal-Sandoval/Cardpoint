# Cardpoint.cl 🃏 (v1.4.1)

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
*   **Cargador de Imágenes:** Integración con la API de **ImgBB** con compresión client-side en canvas para fotos reales de las cartas desde dispositivos móviles y escritorio.
*   **Iconografía:** [Lucide React](https://lucide.dev/) (iconos vectoriales de alto rendimiento).

---

## ✨ Características Principales e Implementaciones

### 🏆 1. Priorización de Vitrina Bilingüe y Catálogo (v1.4.1)
*   **Normalización Universal de Rarezas en Vitrina:** Corrección al algoritmo de ordenamiento de la vitrina principal (`RARITY_PRIORITY`), permitiendo que cartas registradas con nombres de rareza en inglés (ej. *Illustration Rare*, *Special Illustration Rare*, *Ultra Rare*, etc.) reciban su prioridad jerárquica correcta y no sean relegadas al final del stock.
*   **Filtrado de Catálogo Bilingüe:** Los filtros de rareza del catálogo ahora relacionan sinónimos en español e inglés sin distinción, permitiendo encontrar cartas sin importar el idioma de origen del registro.

### 📱 2. Panel de Administración y Optimización Móvil (v1.4.0)
*   **Subida Robusta de Fotos en Móviles:** Normalización de archivos e interoperabilidad para selectores de cámara en iOS (Safari/HEIC) y Android, asegurando nombres con marca temporal y cabeceras MIME `image/jpeg` válidas en el envío a ImgBB.
*   **Compresión por Canvas Previa:** Compresión dinámica a máximo 800px y 85% de calidad previa al envío en todas las vías de carga de fotos reales (carga individual y por lotes).
*   **Buscador Bilingüe Asistido (Español ↔ Inglés):** Integración con traducción automática de nombres de cartas (Español ➔ Inglés) en caso de no hallar coincidencias directas en la API oficial en inglés (ej. *"Determinación de Lillie"* ➔ *"Lillie's Determination"*), indicando visualmente el término traducido.
*   **Auto-relleno y Traducción de Metadatos:** Al seleccionar una carta desde la base de datos oficial, se traduce su rareza al español (*Doble Rara*, *Especial Ilustración Rara*, etc.), se asigna el set y código oficial, y se genera un resumen de metadatos (serie, año, `#XXX`) en la descripción.

### 🛡️ 2. Auditoría y Optimización Integral (UX/UI, Performance, Seguridad & SEO v1.3.0)
*   **Corrección de Clases Tailwind CSS Inválidas:** Normalización de ~50 clases fuera del estándar Tailwind v4 (`text-slate-650` ➔ `text-slate-600`, `z-45` ➔ `z-[45]`, `slate-855` ➔ `slate-800`, `blue-955` ➔ `blue-950`, etc.) en todas las vistas de la aplicación.
*   **Corrección de Paginación en Noticias:** Solución al error de cálculo de total de páginas en el botón "Siguiente" (`/ 6` ➔ `/ 12`), previniendo la navegación hacia vistas en blanco.
*   **Prevención de Memory Leaks en Hooks:** Implementación de banderas de montaje (`isMounted`) y limpieza en `useCards`, `useNews`, `useTournaments` y `useAutoNews` para evitar actualizaciones de estado en componentes desmonados.
*   **Protección de Almacenamiento Local:** Envoltura con bloque `try...catch` en `localStorage.setItem` para evitar fallos no capturados por límite de cuota (`QuotaExceededError`).
*   **Depuración de Política de Seguridad (CSP):** Eliminación de dominios de proxies CORS externos en la cabecera `Content-Security-Policy` de `vercel.json` y adición de la cabecera `Permissions-Policy`.
*   **Mejoras de Accesibilidad (WCAG/ARIA):** Incorporación de atributos `role="dialog"`, `aria-modal="true"` y etiquetas explícitas `aria-label` en modales y botones de cierre, junto con `aria-hidden="true"` en SVGs decorativos.

### 📦 3. Importador Masivo por Código y Autocompletado (Batch Import Engine)
*   **Importación Solo por Código:** Permite a los administradores importar un lote de cartas ingresando únicamente el **Código de Set y Número** (ej. `TWMla 123/234`, `PORla 084/088`, `PFLla 089/094`, `MEGla 119/132`), sin necesidad de escribir el nombre de la carta.
*   **Mapeo Inteligente de Sets y Pocket Expansions:** Reconocimiento de códigos de tienda y ediciones especiales de Pokémon TCG y TCG Pocket (`por` ➔ `me3`, `pfl` ➔ `me2`, `meg` ➔ `me1`, `asc` ➔ `me2pt5`, `jtg` ➔ `sv9`).
*   **Motor de Reintentos de API (`fetchCardsWithRetry`):** Sistema de consulta con reintentos automáticos (3 intentos con retardo progresivo) para prevenir fallos transitorios de red o cierres de conexión cuando la API responde con retardo.
*   **Búsqueda Multicriterio Simultánea:** Consulta dual por `set.id`, `set.ptcgoCode` y el código crudo ingresado por el usuario (`rawSetCode`), más fallback secundario por número de carta.
*   **Ilustraciones Oficiales en Español e Inglés:** Para cartas ingresadas en Español (`la` o `es`), consulta los servidores de Pokémon (`assets.pokemon.com`) para obtener la **ilustración oficial en español**, e incorpora un respaldo automático en 3 niveles (*fallback*: Español ➔ Inglés HD ➔ Arte Comodín) con protección antiroturas (`onerror = null`).
*   **Edición e Inserción por Chunks en Supabase:** Inserción en bloques de a 100 filas (`CHUNK_SIZE = 100`) para garantizar la carga fluida de listas extensas sin saturar la conexión ni exceder límites de payload HTTP.
*   **Buscador Asistido de la API en Edición Manual:** Modal de configuración manual con **buscador por nombre en tiempo real** que consulta la API oficial y aplica datos e ilustración en un solo clic.

### 🧪 3. Suite de Tests Unitarios (32 Pruebas Automatizadas)
*   **Pruebas de Parser de Importación (`batchImportParser.test.js`):** 14 tests que verifican la extracción de códigos, ceros iniciales, sufijos de idioma, banderas, rarezas forzadas y compatibilidad de formato.
*   **Pruebas de Catálogo y Ordenamiento (`rarityAndSorting.test.js`):** 7 tests que aseguran la correcta normalización de texto y el cumplimiento estricto del algoritmo de prioridades por rareza.
*   **Pruebas de Utilidades (`dateUtils.test.js`):** 5 tests de parseo de fechas en español.
*   **Pruebas de Componentes UI (`components.test.jsx`):** 6 tests que validan el renderizado del logo SVG, insignias de liga, iconos y slots de publicidad AdSense.

### 📰 4. Noticias Automáticas con Imágenes Reales
*   **Fuente RSS:** Consume el feed de **Pokémon Alpha** (`pokemonalpha.es/feed/`) vía `api.rss2json.com`.
*   **Extracción de Imágenes:** Extracción de `og:image` server-side a través de una **Vercel Function** (`/api/og-proxy`) y middleware local de Vite.
*   **Fallback Inteligente:** Asignación de pool de imágenes únicas de respaldo sin duplicados entre noticias.
*   **Editor de Noticias:** Panel administrativo para sustituir la imagen de cualquier noticia con almacenamiento en Supabase.

### 🔍 5. Catálogo y Stock Físico Inteligente
*   **Ordenamiento por Rarity (Default):** Ordenamiento predeterminado priorizando rarezas superiores (*Hyper Raras*, *Secretas Doradas*, *Ultra Raras Secreta*, *Ilustración Rara*, etc.), seguidas por *Ultra Raras*, *Raras*, *Doble Raras*, y finalmente cartas *Comunes*. Si coinciden en rareza, se ordenan por precio de mayor a menor.
*   **Filtros de Rareza Adaptativos:** Ocultación automática de botones de filtro para rarezas que no cuentan con stock disponible en la base de datos.
*   **Scroll Reset en Paginación:** Desplazamiento suave automático al inicio de la grilla de cartas al cambiar de página con margen para el menú fijo (*sticky header*).

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
