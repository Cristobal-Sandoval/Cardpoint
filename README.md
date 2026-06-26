# Cardpoint.cl 🃏 (v1.0.2)

Plataforma oficial de **Cardpoint Concepción**, una aplicación web moderna diseñada para la exhibición, catalogación y gestión de cartas sueltas (singles) de **Pokémon TCG** en Chile. 

Este sitio sirve de portal informativo y catálogo en tiempo real, complementando las actividades del perfil de Instagram oficial de [@cardpoint.cl](https://www.instagram.com/cardpoint.cl/).

---

## 🛠️ Tecnologías y Arquitectura del Proyecto

La arquitectura del proyecto está optimizada para la velocidad, la responsividad y una experiencia de usuario premium:

*   **Frontend Core:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (para un empaquetado de producción ultrarrápido y liviano).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (con configuraciones personalizadas de tema y animaciones fluidas).
*   **Base de Datos y Backend:** [Supabase](https://supabase.com/) (PostgreSQL en tiempo real con políticas RLS de seguridad).
*   **Enrutamiento y Code Splitting:** [React Router v7](https://reactrouter.com/) + Carga perezosa de rutas (`React.lazy` y `<Suspense>`) para segmentar las vistas del cliente y la administración privada.
*   **Carga diferida (Lazy Loading):** Los bundles de páginas pesadas (Buscador API, Catálogo, Noticias, Torneos) se cargan de forma diferida, reduciendo el bundle de inicio bajo los 500 kB.
*   **Monetización Premium:** Componentes dinámicos de publicidad con integración a **Google AdSense** y auto-colapso inteligente para bloques no rellenados (evita desplazamientos CLS).
*   **Cargador de Imágenes:** Integración con la API de **ImgBB** para almacenar fotos reales de las cartas desde el panel administrativo.
*   **Iconografía:** [Lucide React](https://lucide.dev/) (iconos vectoriales de alto rendimiento).

---

## ✨ Características Principales e Implementaciones

### 📦 1. Importador Masivo de Mazos (Batch Deck Importer)
*   **Carga Automatizada:** Permite a los administradores copiar la lista de un mazo directamente en formato oficial de juego (ej. *Limitless TCG* o *Pokémon TCG Live*) e importarla de un solo clic.
*   **Normalización de Formatos:** El sistema limpia automáticamente ceros a la izquierda en los números de las cartas (ej. `"018"` ➔ `"18"`) y mapea códigos de expansión estándar a los identificadores correctos de la base de datos (ej. `TWM` ➔ `sv6`, `PRE` ➔ `sv8pt5`).
*   **Interfaz de Control Detallada:** Paso 2 de previsualización que muestra miniaturas, nombres de cartas, rarezas y precios sugeridos. Incluye **checkboxes individuales** para permitir al administrador seleccionar qué cartas específicas publicar y cuáles omitir antes de realizar el guardado definitivo.

### 📰 2. Integración de Noticias de Pokémon Alpha
*   **Proveedor de Contenidos:** Integración simplificada orientada exclusivamente a **Pokémon Alpha** como fuente oficial, garantizando artículos de alta calidad en español.
*   **Lectura Completa Enriquecida:** Los usuarios acceden a artículos completos en lugar de resúmenes. Los enlaces a las fuentes originales son sutiles, situados elegantemente en la esquina inferior del contenido sin marcos intrusivos.
*   **Estrategia de Caché Avanzada:** Uso de claves de almacenamiento local versionadas para forzar la actualización de imágenes y contenido real en los navegadores de los visitantes.

### 🔍 3. Catálogo y Stock Físico Inteligente
*   **Ordenamiento por Rarity (Default):** El catálogo ordena las cartas de manera predeterminada priorizando las rarezas superiores a *Ultra Rara* (Hyper Raras, Secretas Doradas, etc.), seguidas por las cartas *Raras*, *Doble Raras* y finalmente rarezas comunes. Si coinciden en rareza, se ordenan de mayor a menor precio.
*   **Filtros de Rareza Adaptativos:** La barra de filtros de rarezas analiza dinámicamente el stock cargado en base de datos. Si una rareza (como *"Secreta Dorada"*) no está presente en ninguna carta en stock, el botón se oculta automáticamente para evitar filtros vacíos (0 resultados).
*   **Paginación con Restablecimiento de Vista (Scroll Reset):** Al avanzar o retroceder de página en el catálogo, la pantalla realiza un scroll suave automático (`scrollIntoView`) hasta el inicio del listado de cartas. El scroll incluye un margen superior de `100px` para respetar la barra de navegación superior fija (*sticky navigation header*).

### 🚀 4. Optimización de Rendimiento (Web Vitals) y SEO
*   **Preconexión de Servidores:** Preconexiones DNS y TCP agregadas para `images.pokemontcg.io`, acelerando la descarga del arte oficial de las cartas en el buscador.
*   **Metadatos Sociales Dinámicos:** Hook `useSEO` mejorado para actualizar en tiempo real los tags de OpenGraph (`og:*`) y Twitter Cards en el DOM, permitiendo previsualizaciones visuales exactas en enlaces compartidos (por ejemplo, al enviar noticias o detalles de catálogo).
*   **Páginas Indexables:** Creación de archivos estáticos `robots.txt` y `sitemap.xml` para guiar a los rastreadores web sobre las rutas válidas, impidiendo el indexado de la ruta privada `/acceso-privado-cp/*`.

---

## 🚀 Instalación y Desarrollo Local

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

4.  **Generar Compilación de Producción:**
    ```bash
    npm run build
    ```

---

## 👥 Contacto y Soporte

Desarrollado y mantenido para la comunidad chilena de coleccionistas y jugadores competitivos de Pokémon TCG. 

> [!IMPORTANT]
> **Canal Oficial de Contacto:**
> Para resolver cualquier tipo de duda, coordinar compras del catálogo, enviar decklists o realizar consultas comerciales, el **único canal oficial disponible** es nuestro perfil de **[Instagram Oficial @cardpoint.cl](https://www.instagram.com/cardpoint.cl/)**. No se atienden requerimientos por otros medios.
