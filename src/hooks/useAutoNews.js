import { useState, useEffect } from 'react';

const FALLBACK_NEWS = [
  {
    "id": "tcgnews-fallback-0",
    "title": "Pokémon TCG Pocket: Maravillas Cotidianas, la expansión donde los Pokémon descansan y disfrutan",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/330/mediana.avif",
    "summary": "Maravillas Cotidianas es una expansión de Pokémon TCG Pocket centrada en cartas con ilustraciones tiernas y relajadas de Pikachu, Piplup, Snorlax, Greedent y Sylveon.",
    "content": "<p class=\"noti-p\"><strong>Pok&eacute;mon TCG Pocket sumar&aacute; una nueva expansi&oacute;n antes de cerrar junio.</strong> The Pok&eacute;mon Company International anunci&oacute; <strong>Maravillas Cotidianas (</strong><strong>Everyday Wonders)</strong>, colecci&oacute;n que llegar&aacute; al juego m&oacute;vil el <strong>lunes 29 de junio de 2026 a las 21:00 horas de Chile continental</strong>.</p><p class=\"noti-p\">La expansi&oacute;n estar&aacute; protagonizada por Pok&eacute;mon como <strong>Pikachu, Piplup, Snorlax, Greedent y Sylveon</strong>, con una propuesta visual centrada en ilustraciones coloridas, tiernas y m&aacute;s relajadas dentro del universo de Pok&eacute;mon.</p><p class=\"noti-p\"><div class=\"embed youtube\" style=\"aspect-ratio:560 / 315;\"><iframe allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen=\"allowfullscreen\" height=\"315\" referrerpolicy=\"strict-origin-when-cross-origin\" src=\"https://www.youtube.com/embed/D9sNrJPWAaA?si=trZ8vromXXZnfX_W\" title=\"YouTube video player\" width=\"560\" loading=\"lazy\" scrolling=\"no\">&nbsp;</iframe>",
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
    "content": "<p class=\"noti-p\"><strong>El Team Rocket sabe aparecer justo cuando parec&iacute;a que la conversaci&oacute;n iba por otro lado.</strong> Esta vez no fue por una carta revelada ni por un anuncio oficial de The Pok&eacute;mon Company, sino por un nuevo registro de marca en Jap&oacute;n que comenz&oacute; a generar preguntas entre jugadores y coleccionistas.</p><p class=\"noti-p\">Seg&uacute;n report&oacute; Pok&eacute;Beach, el registro corresponde a una frase que puede traducirse como <strong>&ldquo;&iquest;Acaso eres del Team Rocket?&rdquo;</strong> o <strong>&ldquo;&iquest;Podr&iacute;as ser del Team Rocket?&rdquo;</strong>.</p><p class=\"noti-p\">El detalle llam&oacute; la atenci&oacute;n porque, en <a href=\"https://tcgnews.cl/buscador/categoria/pokemon-tcg\" class=\"noti-a\">Pok&eacute;mon TCG</a>, algunos registros de marca han aparecido antes de la revelaci&oacute;n de productos o expansiones. Sin embargo, en este caso todav&iacute;a no existe confirmaci&oacute;n oficial de que se trate de un nuevo set del juego de cartas.</p><h2 class=\"noti-h2\">Un nombre poco habitual para una expansi&oacute;n</h2><p class=\"noti-p\">La parte curiosa es que el nombre no suena como el t&iacute;tulo tradicional de una colecci&oacute;n principal de <a href=\"https://tcgnews.cl/buscador/categoria/pokemon-tcg\" class=\"noti-a\">Pok&eacute;mon TCG</a>. M&aacute;s que una frase corta o un concepto directo, parece una l&iacute;nea de di&aacute;logo, algo que podr&iacute;a encajar tanto en una experiencia tem&aacute;tica como en otro tipo de producto vinculado a Pok&eacute;mon.</p><p class=\"noti-p\">Eso deja abiertas varias posibilidades. Podr&iacute;a estar relacionado con Pok&eacute;mon TCG, pero tambi&eacute;n podr&iacute;a tratarse de un juego f&iacute;sico, una campa&ntilde;a especial o un proyecto distinto dentro de la franquicia.</p><p class=\"noti-p\">Por ahora, lo m&aacute;s prudente es leer este registro como una se&ntilde;al temprana y no como una confirmaci&oacute;n de una nueva expansi&oacute;n del Team Rocket.</p><h2 class=\"noti-h2\">Por qu&eacute; el Team Rocket vuelve a llamar la atenci&oacute;n</h2><p class=\"noti-p\">El inter&eacute;s no aparece de la nada. El Team Rocket tuvo un regreso importante dentro del juego de cartas con <strong>Rivales Predestinados (Destined Rivals) en mayo de 2025</strong>, expansi&oacute;n que volvi&oacute; a poner en escena a la organizaci&oacute;n, sus Pok&eacute;mon y entrenadores asociados como Giovanni.</p><p class=\"noti-p\">Para muchos jugadores y coleccionistas, el Team Rocket no es solo otro grupo villano dentro de Pok&eacute;mon. Es una de las im&aacute;genes m&aacute;s reconocibles de la franquicia, con una identidad marcada por la nostalgia, el anime, los videojuegos y tambi&eacute;n la historia del propio TCG.</p><p class=\"noti-p\">Por eso, cada vez que aparece un registro con su nombre, la comunidad empieza a preguntarse si se trata de una pista real o simplemente de otro movimiento dentro del enorme universo de productos Pok&eacute;mon.</p><h2 class=\"noti-h2\">Por ahora, solo una pista</h2><p class=\"noti-p\">Hasta el momento, The Pok&eacute;mon Company no ha anunciado una nueva expansi&oacute;n de Pok&eacute;mon TCG basada en este registro.</p><p class=\"noti-p\">Aun as&iacute;, el nombre deja una pregunta interesante para los pr&oacute;ximos meses: si el Team Rocket tendr&aacute; otra aparici&oacute;n dentro del juego de cartas o si Pok&eacute;mon est&aacute; preparando algo distinto alrededor de una de sus organizaciones m&aacute;s recordadas.</p><p class=\"noti-p\">Por ahora, no hay confirmaci&oacute;n. Solo una frase registrada, una comunidad atenta y el Team Rocket haciendo lo que mejor sabe hacer: volver cuando nadie lo esperaba.</p><hr><p class=\"noti-p\"><strong>Fuente:</strong> <a href=\"https://www.pokebeach.com/2026/06/are-you-perhaps-with-team-rocket-trademark-filed-for-the-pokemon-tcg\" class=\"noti-a\">Pok&eacute;Beach.</a></p>",
    "sourceUrl": "https://www.tcgnews.cl/noticia/un-nuevo-registro-en-japon-vuelve-a-poner-al-team-rocket-en-el-radar-de-pokemon",
    "sourceName": "Noticias TCG",
    "isExternal": true
  },
  {
    "id": "tcgnews-fallback-2",
    "title": "Mega Rayquaza lidera el adelanto de nuevas expansiones de Pokémon TCG",
    "date": "2026-06-24",
    "image": "https://www.tcgnews.cl/noticia/imagenes/322/mediana.avif",
    "summary": "Pokémon compartió un nuevo adelanto oficial protagonizado por Mega Rayquaza, conectando próximos lanzamientos de Pokémon TCG Pocket y del TCG físico.",
    "content": "<p class=\"isSelectedEnd noti-p\">Pok&eacute;mon sorprendi&oacute; a la comunidad con un nuevo adelanto oficial publicado a trav&eacute;s de sus canales en X y YouTube. El video tiene como protagonista a <strong>Mega Rayquaza</strong>, uno de los Pok&eacute;mon m&aacute;s reconocidos de la franquicia y una figura clave dentro de la historia de las Mega Evoluciones.</p><p class=\"isSelectedEnd noti-p\"><div class=\"embed youtube\" style=\"aspect-ratio:560 / 315;\"><iframe allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen=\"allowfullscreen\" height=\"315\" referrerpolicy=\"strict-origin-when-cross-origin\" src=\"https://www.youtube.com/embed/QDtjW4hSNr0?si=GtnsBBfdptdANe8h\" title=\"YouTube video player\" width=\"560\" loading=\"lazy\" scrolling=\"no\">&amp;nbsp;</iframe>",
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
    "content": "<p class=\"noti-p\"><strong>James Kowalski se coron&oacute; campe&oacute;n del NAIC 2026 de Pok&eacute;mon TCG Masters</strong>, tras quedarse con el t&iacute;tulo usando <strong>Lillie&rsquo;s Clefairy</strong> en uno de los torneos m&aacute;s importantes de la temporada competitiva antes del <strong>Mundial Pok&eacute;mon 2026</strong>.</p><p class=\"noti-p\">El <strong>North America International Championships 2026</strong> se celebr&oacute; en New Orleans, Estados Unidos, y reuni&oacute; competencias de <strong><a href=\"https://tcgnews.cl/noticias/pokemon-tcg\" class=\"noti-a\">Pok&eacute;mon TCG</a></strong>, <strong>Video Game Championships</strong>, <strong>Pok&eacute;mon GO</strong> y <strong>Pok&eacute;mon UNITE</strong>. En la divisi&oacute;n Masters de Pok&eacute;mon TCG, el evento cont&oacute; con <strong>3.752 jugadores</strong> y dej&oacute; un Top 8 marcado por la fuerte presencia de <strong>Dragapult</strong>.</p><p class=\"noti-p\">De los ocho puestos del corte final, cuatro fueron ocupados por versiones de Dragapult, incluyendo listas con <strong>Dusknoir</strong>, <strong>Blaziken</strong> y variantes m&aacute;s directas del arquetipo. Sin embargo, el campeonato termin&oacute; en manos de Kowalski, quien logr&oacute; imponerse con una estrategia de menor presencia dentro del metajuego de fase 2.</p><h2 class=\"noti-h2\">Un t&iacute;tulo llamativo en un formato marcado por Dragapult</h2><p class=\"noti-p\">El resultado de James Kowalski destaca especialmente por el contexto competitivo del torneo. Seg&uacute;n los datos de fase 2 registrados por Limitless TCG, <strong>Dragapult represent&oacute; el 48,15% de los mazos</strong> en esa etapa, muy por encima de arquetipos como <strong>N&rsquo;s Zoroark</strong>, <strong>Alakazam</strong>, <strong>Crustle</strong> y <strong>Slowking</strong>.</p><p class=\"noti-p\">En contraste, <strong>Lillie&rsquo;s Clefairy</strong> tuvo una presencia mucho menor, con solo <strong>1,19%</strong> en fase 2. Esa diferencia convierte el t&iacute;tulo de Kowalski en uno de los resultados m&aacute;s llamativos del cierre competitivo del NAIC 2026.</p><div class=\"embed instagram\" style=\"aspect-ratio:540 / 700;\"><iframe src=\"https://www.instagram.com/p/DZlAilFH8TP/embed\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\" title=\"Instagram embed\" scrolling=\"no\" height=\"700\" width=\"540\"></iframe>",
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
    "content": "<p class=\"noti-p\"><strong>Pok&eacute;mon TCG Pocket inici&oacute; un nuevo evento bot&iacute;n centrado en Ceruledge ex</strong>, sumando una nueva actividad temporal para los jugadores tras la llegada de <strong><a href=\"https://tcgnews.cl/noticia/impulso-paradojico-ya-esta-disponible-en-pokemon-tcg-pocket-con-koraidon-ex-y-miraidon-ex\" class=\"noti-a\">Impulso Parad&oacute;jico</a></strong><a href=\"https://tcgnews.cl/noticia/impulso-paradojico-ya-esta-disponible-en-pokemon-tcg-pocket-con-koraidon-ex-y-miraidon-ex\" class=\"noti-a\">.</a></p><p class=\"noti-p\">El evento estar&aacute; disponible del <strong>13 al 23 de junio</strong> y funciona a trav&eacute;s de <strong>combates individuales</strong> contra mazos especiales del evento. Al ganar estas partidas, los jugadores pueden obtener recompensas, incluyendo sobres promocionales con cartas disponibles por tiempo limitado.</p><h2 class=\"noti-h2\">Cartas disponibles en el evento</h2><p class=\"noti-p\">Los sobres promocionales del evento pueden incluir las siguientes cartas:</p><p class=\"noti-p\"><strong>Ceruledge ex</strong></p><p class=\"noti-p\"><strong><img alt=\"Ceruledge ex - 66/P-B\" class=\"carta-noti noti-img\" src=\"https://i.imgur.com/Sla4l2Z.jpeg\"></strong></p><p class=\"noti-p\"><strong>Dudunsparce</strong></p><p class=\"noti-p\"><strong><img alt=\"Dudunsparce - 68/P-B\" class=\"carta-noti noti-img\" src=\"https://i.imgur.com/U4bjm9C.jpeg\"></strong></p><p class=\"noti-p\"><strong></strong><strong>Charcadet</strong></p><p class=\"noti-p\"><strong><img alt=\"Charcadet - 64/P-B\" class=\"carta-noti noti-img\" src=\"https://i.imgur.com/QXlP7lW.jpeg\"></strong></p><p class=\"noti-p\"><strong>Vaporeon</strong></p><p class=\"noti-p\"><strong><img alt=\"Vaporeon - 65/P-B\" class=\"carta-noti noti-img\" src=\"https://i.imgur.com/jFWrRQB.jpeg\"></strong></p><p class=\"noti-p\"><strong>Pawniard</strong></p><p class=\"noti-p\"><strong><img alt=\"Pawniard - 67/P-B\" class=\"carta-noti noti-img\" src=\"https://i.imgur.com/tnCHe5e.jpeg\"></strong></p><p class=\"noti-p\">Como en otros eventos bot&iacute;n de <strong><a href=\"https://tcgnews.cl/noticias/pokemon-tcg-pocket\" class=\"noti-a\">Pok&eacute;mon TCG Pocket</a></strong>, la obtenci&oacute;n de estas cartas depende de los sobres promocionales conseguidos durante la actividad. Mientras m&aacute;s combates complete el jugador, m&aacute;s oportunidades tendr&aacute; de sumar las cartas del evento a su colecci&oacute;n digital.</p><h2 class=\"noti-h2\">Un nuevo evento tras Impulso Parad&oacute;jico</h2><p class=\"noti-p\">La actividad llega en medio del calendario posterior a <strong>Impulso Parad&oacute;jico</strong>, la expansi&oacute;n que incorpor&oacute; nuevas cartas y eventos al juego durante junio. En ese contexto, Ceruledge ex toma el foco como carta principal de este nuevo evento bot&iacute;n.</p><p class=\"noti-p\">Los eventos bot&iacute;n se han convertido en una de las formas habituales en que <strong>Pok&eacute;mon TCG Pocket</strong> mantiene activa su rotaci&oacute;n de contenido, entregando cartas promocionales a trav&eacute;s de partidas contra la CPU y recompensas limitadas por tiempo.<em></em></p>",
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
    "content": "<p class=\"noti-p\">Un total de <strong>30&nbsp;</strong><strong>jugadores chilenos</strong> figuran en la competencia de <strong>Pok&eacute;mon TCG</strong> del <strong>North America International Championships 2026</strong>, una de las grandes citas internacionales de la temporada <strong>Play! Pok&eacute;mon</strong>.</p><p class=\"noti-p\">El <strong>NAIC 2026</strong> comienza este <strong>viernes 12 de junio</strong> en <strong>New Orleans, Louisiana</strong>, y se desarrollar&aacute; hasta el <strong>domingo 14 de junio</strong> en el <strong>Ernest N. Morial Convention Center</strong>. La transmisi&oacute;n oficial del evento est&aacute; programada para iniciar a las <strong>9:30 horas de Chile</strong>.</p><p class=\"noti-p\">Para la escena chilena, la presencia de <strong>30&nbsp;</strong><strong>jugadores</strong> permite dimensionar la participaci&oacute;n nacional en una de las principales citas internacionales del calendario competitivo. El evento re&uacute;ne a competidores de distintas regiones y forma parte del cierre de temporada previo al <strong>Campeonato Mundial Pok&eacute;mon 2026</strong>.</p><h2 class=\"noti-h2\">Los jugadores chilenos inscritos en Pok&eacute;mon TCG</h2><p class=\"noti-p\">De acuerdo con el listado de participantes revisado por <strong>TCG News</strong>, estos son los jugadores de Chile que figuran en la competencia de <strong>Pok&eacute;mon TCG</strong>:</p><ul class=\"noti-ul\"><li class=\"noti-li\"><strong>Andr&eacute;s Estefano Gajardo Lopehandia</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Antonio Pavez</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Benjam&iacute;n Guti&eacute;rrez</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Benjam&iacute;n Valenzuela</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Camilo Fern&aacute;ndez</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Camilo Enrique Monsalve Acu&ntilde;a</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Esteban Figueroa</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Fernando L&oacute;pez</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Fernando Cifuentes</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Francisco Vidal</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Francisco Toloza</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Francisco Osorio</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Hern&aacute;n Clivio</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Jorge Espinosa</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Luis Venegas</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Manuel Gonz&aacute;lez</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Marco Cifuentes D.</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Marco Cifuentes</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Mario Elgueta</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Mart&iacute;n Cazenave</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Rafael Sep&uacute;lveda</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Rodrigo Onetto</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Santiago Prieto</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Sebasti&aacute;n Soto</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Waldo Ortega</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Wilsonn Molina</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Yerco Valencia</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Javier Romero</strong> &mdash; Masters</li><li class=\"noti-li\"><strong>Vicente Carrasco</strong> &mdash; Senior</li><li class=\"noti-li\"><strong>Emilio Cordero</strong> &mdash; Senior</li></ul><h2 class=\"noti-h2\">Una cita importante de la temporada</h2><p class=\"noti-p\">El <strong>North America International Championships</strong> es uno de los eventos m&aacute;s relevantes del calendario competitivo de <strong>Pok&eacute;mon TCG</strong>. Su ubicaci&oacute;n en el cierre de temporada lo convierte en una instancia importante dentro del camino hacia el Mundial.</p><p class=\"noti-p\">Adem&aacute;s del peso competitivo, el evento tambi&eacute;n funciona como punto de encuentro para comunidades de distintas regiones, con presencia de jugadores internacionales en varias categor&iacute;as.</p><h2 class=\"noti-h2\">Transmisi&oacute;n oficial del NAIC 2026</h2><p class=\"noti-p\">El <strong>NAIC 2026</strong> contar&aacute; con <strong>transmisi&oacute;n oficial</strong> durante el fin de semana. Para este viernes, la cobertura est&aacute; programada para comenzar a las <strong>9:30 horas de Chile</strong>.</p><p class=\"noti-p\">La transmisi&oacute;n de <strong>Pok&eacute;mon TCG</strong> estar&aacute; disponible a trav&eacute;s de los canales oficiales de Pok&eacute;mon, incluyendo <strong>Play Pok&eacute;mon</strong> en YouTube y Twitch.</p><p class=\"noti-p\">La cobertura oficial de <strong>Pok&eacute;mon TCG</strong> para el evento puede seguirse en el siguiente reproductor:</p><p class=\"noti-p\"><div class=\"embed youtube\" style=\"aspect-ratio:560 / 315;\"><iframe allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen=\"allowfullscreen\" height=\"315\" referrerpolicy=\"strict-origin-when-cross-origin\" src=\"https://www.youtube.com/embed/UOCabX5Hqrw?si=oQ0l5rE_7Lq-cGs5&amp;controls=0\" title=\"YouTube video player\" width=\"560\" loading=\"lazy\" scrolling=\"no\">&amp;nbsp;</iframe>",
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
    "content": "<p class=\"noti-p\"><strong>Pok&eacute;mon TCG</strong> estrenar&aacute; una nueva serie de sobres de premio para el programa <strong>Play! Pok&eacute;mon</strong>. Se trata de los <strong>Prize Pack Series 9 / Serie 9 de sobres de premio</strong>, cuya distribuci&oacute;n est&aacute; anunciada a partir del <strong>1 de julio de 2026</strong> en tiendas participantes, aunque la disponibilidad puede variar seg&uacute;n cada regi&oacute;n, pa&iacute;s y tienda.</p><p class=\"noti-p\">Estos sobres forman parte del sistema de recompensas del juego organizado y se entregan en eventos de Liga, torneos locales y actividades oficiales realizadas por tiendas <strong>Play! Pok&eacute;mon</strong>. A diferencia de un producto regular, no est&aacute;n pensados para venta directa, sino como incentivo para quienes participan en la comunidad local.</p><h2 class=\"noti-h2\">&iquest;Qu&eacute; son los Prize Pack Series 9?</h2><p class=\"noti-p\">Los <strong>Prize Pack Series 9</strong> son sobres promocionales de <strong>Pok&eacute;mon TCG</strong> que contienen cartas seleccionadas de distintas expansiones recientes. Cada sobre incluye <strong>6 cartas</strong> tomadas de un conjunto de m&aacute;s de <strong>100 cartas</strong>. La <a href=\"https://www.pokemon.com/static-assets/content-assets/cms2-es-xl/pdf/trading-card-game/checklist/prize_pack_series_9_web_cardlist_latam.pdf\" class=\"noti-a\">lista oficial de cartas</a> incluye cartas provenientes de las series <strong>Escarlata y P&uacute;rpura</strong> y <strong>Megaevoluci&oacute;n</strong>.</p><p class=\"noti-p\">Todas las cartas incluidas son v&aacute;lidas en el <strong>formato Est&aacute;ndar</strong> y llevan el sello de <strong>Play! Pok&eacute;mon</strong>, lo que las diferencia de sus versiones regulares y las vuelve atractivas tanto para jugadores como para coleccionistas.</p><h2 class=\"noti-h2\">Cartas destacadas de la Serie 9</h2><p class=\"noti-p\">Pok&eacute;mon confirm&oacute; una muestra de cartas que podr&aacute;n aparecer dentro de esta nueva serie de sobres. Entre las cartas destacadas se encuentran:</p><ul class=\"noti-ul\"><li class=\"noti-li\"><strong>Mega-Dragonite ex</strong></li><li class=\"noti-li\"><strong>Zekrom de N</strong></li><li class=\"noti-li\"><strong>Mega-Starmie ex</strong></li><li class=\"noti-li\"><strong>Meowth ex</strong></li></ul><p class=\"noti-p\">La serie tambi&eacute;n incluir&aacute; <strong>Pok&eacute;mon ex Megaevoluci&oacute;n</strong>, algunos <strong>Pok&eacute;mon de Entrenadores</strong> y una selecci&oacute;n de cartas de Entrenador &uacute;tiles para el formato actual.</p><h2 class=\"noti-h2\">&iquest;C&oacute;mo se consiguen?</h2><p class=\"noti-p\">La principal forma de conseguir los <strong>Prize Pack Series 9</strong> ser&aacute; participando en eventos de tiendas <strong>Play! Pok&eacute;mon</strong> que reciban esta serie de sobres. Esto puede incluir actividades de Liga, torneos locales y otros encuentros oficiales organizados por tiendas participantes.</p><p class=\"noti-p\"><strong>La distribuci&oacute;n de sobres puede variar seg&uacute;n la regi&oacute;n, el pa&iacute;s, la tienda y el nivel de actividad de cada Liga local.</strong> </p><h2 class=\"noti-h2\">&iquest;Por qu&eacute; son importantes?</h2><p class=\"noti-p\">Para jugadores competitivos, estos sobres pueden ser una forma adicional de obtener cartas v&aacute;lidas en Est&aacute;ndar y versiones con sello especial de cartas utilizadas en el formato. Para jugadores casuales o nuevos, funcionan como una puerta de entrada al juego organizado y una motivaci&oacute;n para participar en eventos locales.</p><p class=\"noti-p\">Tambi&eacute;n tienen valor para coleccionistas, ya que las cartas con sello de <strong>Play! Pok&eacute;mon</strong> suelen quedar asociadas directamente a la participaci&oacute;n en eventos oficiales y pueden diferenciarse de las versiones tradicionales disponibles en sobres comerciales.</p><p class=\"noti-p\">Quienes quieran conseguir los <strong>Prize Pack Series 9</strong> deber&aacute;n revisar la disponibilidad en <a href=\"https://events.pokemon.com/EventLocator/\" class=\"noti-a\">tiendas </a><strong><a href=\"https://events.pokemon.com/EventLocator/\" class=\"noti-a\">Play! Pok&eacute;mon</a></strong> cercanas y confirmar directamente con cada local participante.</p><hr><p class=\"noti-p\"><small><strong>Fuente:</strong> <a href=\"https://www.pokemon.com/el/noticias-pokemon/consigue-sobres-de-premio-de-play-pokemon-de-la-serie-9-en-tu-tienda-de-juegos-mas-cercana\" class=\"noti-a\">Pok&eacute;mon</a> </small></p>",
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
    "content": "<p class=\"noti-p\"><strong>Pok&eacute;mon TCG</strong> present&oacute; nuevas cartas y las promos que formar&aacute;n parte del prelanzamiento de <strong>Pitch Black</strong>, expansi&oacute;n que llegar&aacute; a la regi&oacute;n bajo el nombre de <strong>Tinieblas Umbr&iacute;as</strong>.</p><p class=\"noti-p\">El set tendr&aacute; su lanzamiento oficial el <strong>17 de julio de 2026</strong>, pero antes de esa fecha algunas tiendas <strong>Play! Pok&eacute;mon</strong> podr&aacute;n realizar eventos de <strong>Prelanzamiento desde el 4 de julio</strong>, permitiendo a los jugadores probar la expansi&oacute;n con la tradicional <strong>Caja de Combina y Combate</strong>.</p><h2 class=\"noti-h2\">&iquest;Qu&eacute; incluye la Caja de Combina y Combate?</h2><p class=\"noti-p\">Cada caja incluir&aacute; un <strong>mazo de 40 cartas listo para jugar</strong>, <strong>4 sobres de refuerzo</strong> de <strong>Pitch Black (Tinieblas Umbr&iacute;as)</strong> y una de cuatro cartas promo disponibles para este producto.</p><p class=\"noti-p\">Las promos reveladas son:</p><ul class=\"noti-ul\"><li class=\"noti-li\"><strong>Miraidon:</strong> una carta enfocada en presionar desde los primeros turnos y potenciar atacantes el&eacute;ctricos como Vikavolt.</li><li class=\"noti-li\"><strong>Slowbro:</strong> puede alcanzar grandes n&uacute;meros de da&ntilde;o si el jugador logra quedarse sin cartas en la mano.</li><li class=\"noti-li\"><strong>Dhelmise:</strong> se apoya en Pok&eacute;mon con la Habilidad <strong>Escondidas Furtivas</strong> en la pila de descartes para activar una estrategia de alto da&ntilde;o.</li><li class=\"noti-li\"><strong>Bastiodon:</strong> aporta una opci&oacute;n defensiva desde la Banca, dificultando los ataques de bajo costo del rival.</li></ul><div class=\"embed instagram\" style=\"aspect-ratio:540 / 700;\"><iframe src=\"https://www.instagram.com/p/DZVLlsoIHxn/embed\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\" title=\"Instagram embed\" scrolling=\"no\" height=\"700\" width=\"540\"></iframe>",
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
    "content": "<p class=\"noti-p\"><strong>Pok&eacute;mon TCG</strong> sigue mostrando parte de lo que llegar&aacute; con <strong>30th Celebration</strong>, la l&iacute;nea conmemorativa por el aniversario n&uacute;mero 30 del juego de cartas coleccionables de Pok&eacute;mon.</p><p class=\"noti-p\">Durante el <strong>Japan Championships</strong> fueron revelados nuevos productos y cartas asociados a esta celebraci&oacute;n, con <strong>Pikachu ex</strong>, <strong>Espeon ex</strong> y <strong>Umbreon ex</strong> como protagonistas.</p><p class=\"noti-p\"><div class=\"embed youtube\" style=\"aspect-ratio:560 / 315;\"><iframe allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen=\"allowfullscreen\" height=\"315\" referrerpolicy=\"strict-origin-when-cross-origin\" src=\"https://www.youtube.com/embed/nY7q_pnwQI0?si=mNjgbJj5KtrYfy3w&amp;start=37734\" title=\"YouTube video player\" width=\"560\" loading=\"lazy\" scrolling=\"no\">&amp;nbsp;</iframe>",
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
    "content": "<p class=\"noti-p\"><strong><a href=\"https://tcgnews.cl/noticias/pokemon-tcg-live\" class=\"noti-a\">Pok&eacute;mon TCG Live</a></strong> cumple tres a&ntilde;os desde su lanzamiento oficial y habilit&oacute; nuevas recompensas temporales para sus jugadores.</p><p class=\"noti-p\">La plataforma digital del <strong>juego de cartas coleccionables de Pok&eacute;mon</strong> fue lanzada oficialmente en junio de 2023. Como parte de su tercer aniversario, The Pok&eacute;mon Company activ&oacute; una celebraci&oacute;n desde el <strong>4 de junio de 2026</strong>, con regalos por inicio de sesi&oacute;n, contenido especial en la tienda interna y c&oacute;digos promocionales durante el mes.</p><p class=\"noti-p\">Entre las recompensas disponibles se incluyen un cosm&eacute;tico de avatar con gorro de fiesta del tercer aniversario, <strong>1.800 Trainer Points</strong> y cartas especiales de ilustraci&oacute;n rara de <strong>Mega Evolution</strong> protagonizadas por <strong>Bulbasaur, Ivysaur y Venusaur</strong>.</p><p class=\"noti-p\">La tienda del juego tambi&eacute;n contar&aacute; con paquetes especiales por tiempo limitado, que incluyen cartas, accesorios para mazos, objetos de avatar y otros contenidos asociados a la celebraci&oacute;n.</p><div class=\"embed instagram\" style=\"aspect-ratio:540 / 700;\"><iframe src=\"https://www.instagram.com/p/DZLZHOxmKx_/embed\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\" title=\"Instagram embed\" scrolling=\"no\" height=\"700\" width=\"540\"></iframe>",
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
