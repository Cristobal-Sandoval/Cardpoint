# Cardpoint.cl 🃏

Plataforma oficial de **Cardpoint Concepción**, una aplicación web moderna diseñada para la exhibición, catalogación y gestión de cartas sueltas (singles) de **Pokémon TCG** en Chile. 

Este sitio sirve de portal informativo y catálogo en tiempo real, complementando las actividades del perfil de Instagram oficial de [@cardpoint.cl](https://www.instagram.com/cardpoint.cl/).

---

## 🛠️ Tecnologías Utilizadas

La arquitectura del proyecto está optimizada para la velocidad, la responsividad y una experiencia de usuario premium:

*   **Frontend Core:** [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) (para un empaquetado de producción ultrarrápido).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (con configuraciones personalizadas de tema y animaciones fluidas).
*   **Base de Datos y Backend:** [Supabase](https://supabase.com/) (PostgreSQL en tiempo real con políticas RLS de seguridad).
*   **Enrutamiento:** [React Router v6](https://reactrouter.com/) (con carga diferida / *Lazy Loading* de rutas administrativas).
*   **Iconografía:** [Lucide React](https://lucide.dev/) (iconos vectoriales de alto rendimiento).

---

## ✨ Características Principales e Implementaciones Recientes

### 📦 1. Importador Masivo de Mazos (Batch Deck Importer)
*   **Carga Automatizada:** Permite a los administradores copiar la lista de un mazo directamente en formato oficial de juego (ej. *Limitless TCG* o *Pokémon TCG Live*) e importarla de un solo clic.
*   **Normalización de Formatos:** El sistema limpia automáticamente ceros a la izquierda en los números de las cartas (ej. `"018"` ➔ `"18"`) y mapea códigos de expansión estándar a los identificadores correctos de la base de datos (ej. `TWM` ➔ `sv6`, `PRE` ➔ `sv8pt5`).
*   **Interfaz de Control Detallada:** Paso 2 de previsualización que muestra miniaturas, nombres de cartas, rarezas y precios sugeridos. Incluye **checkboxes individuales** para permitir al administrador seleccionar qué cartas específicas publicar y cuáles omitir antes de realizar el guardado definitivo.

### 📰 2. Automatización y Control de Noticias (PokeAlpha)
*   **Proveedor Exclusivo:** Integración simplificada orientada exclusivamente a **Pokémon Alpha** como fuente oficial, garantizando artículos de alta calidad en español.
*   **Panel de Control Inteligente:** Se simplificó la administración a un único toggle maestro: *"Habilitar Noticias Autogeneradas"*, removiendo controles de fuentes inactivas.
*   **Lectura Completa Enriquecida:** Los usuarios acceden a artículos completos en lugar de resúmenes. Los enlaces a las fuentes originales son sutiles, situados elegantemente en la esquina inferior del contenido sin marcos intrusivos.
*   **Estrategia de Caché Avanzada:** Uso de claves de almacenamiento local versionadas (`cardpoint_news_multi_v6`) para forzar la actualización de imágenes y contenido real en los navegadores de los visitantes.

### 🔍 3. Catálogo y Stock Físico Inteligente
*   **Ordenamiento por Rarity (Default):** El catálogo ordena las cartas de manera predeterminada priorizando las rarezas superiores a *Ultra Rara* (Hyper Raras, Secretas Doradas, etc.), seguidas por las cartas *Raras*, *Doble Raras* y finalmente rarezas comunes. Si coinciden en rareza, se ordenan de mayor a menor precio.
*   **Filtros de Rareza Adaptativos:** La barra de filtros de rarezas analiza dinámicamente el stock cargado en base de datos. Si una rareza (como *"Secreta Dorada"*) no está presente en ninguna carta en stock, el botón se oculta automáticamente para evitar filtros vacíos (0 resultados).
*   **Paginación con Restablecimiento de Vista (Scroll Reset):** Al avanzar o retroceder de página en el catálogo, la pantalla realiza un scroll suave automático (`scrollIntoView`) hasta el inicio del listado de cartas. El scroll incluye un margen superior de `100px` para respetar la barra de navegación superior fija (*sticky navigation header*).

### 🚀 4. Auditoría de Rendimiento (Web Vitals) y SEO
*   **Optimización de Carga de Fuentes:** Se migraron las fuentes de texto (`Outfit`) del parser secundario de CSS (`@import` bloqueante) a enlaces paralelos `<link rel="stylesheet">` en el cabezal del HTML, acelerando el tiempo de primer pintado (FCP).
*   **Estabilidad Visual (Evitar CLS):** Los contenedores de bloques de publicidad (*Google AdSense*) y listados de carga cuentan con valores de altura mínima predefinidos (`min-h-*`) y esqueletos de carga animados (*shimmer pulse skeletons*) para evitar saltos bruscos en el diseño mientras se cargan los recursos.
*   **SEO Local e Internacional:** Inclusión de etiquetas meta descriptivas estructuradas (Schema.org JSON-LD) para negocios locales de la región del Biobío, palabras clave clave y marcado Open Graph/Twitter Cards completo para previsualizaciones premium en redes sociales.

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

## 👥 Contribuciones y Contacto

Desarrollado y mantenido para la comunidad chilena de coleccionistas y jugadores competitivos de Pokémon TCG. Si tienes sugerencias de diseño, UX o reportes de fallos, por favor contactar al equipo de Cardpoint a través de su [Instagram Oficial](https://www.instagram.com/cardpoint.cl/).
