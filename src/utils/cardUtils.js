// ── CARD UTILITIES & DEFINITIONS ─────────────────────────────────────────────

export const RARITIES = [
  { id: 'Todas', name: 'Todas' },
  { id: 'Común', name: 'Común' },
  { id: 'Poco Común', name: 'Poco Común' },
  { id: 'Rara', name: 'Rara' },
  { id: 'Doble Rara', name: 'Doble Rara' },
  { id: 'Ultra Rara', name: 'Ultra Rara' },
  { id: 'Ilustración Rara', name: 'Ilustración Rara' },
  { id: 'Especial Ilustración Rara', name: 'Especial Ilustración Rara' },
  { id: 'Ultra Rara Secreta', name: 'Ultra Rara Secreta' },
  { id: 'Secreta Dorada', name: 'Secreta Dorada' },
  { id: 'Hyper Rara', name: 'Hyper Rara' }
];

export const RARITY_OPTIONS = [
  'Común', 'Poco Común', 'Rara', 'Doble Rara', 'Ultra Rara',
  'Ilustración Rara', 'Especial Ilustración Rara', 'Ultra Rara Secreta',
  'Secreta Dorada', 'Hyper Rara'
];

export const ERAS = ['Escarlata y Púrpura', 'Espada y Escudo', 'SM - Sol y Luna', 'XY', 'Black & White', 'Otras'];
export const CONDITIONS = ['NM', 'LP', 'MP', 'HP', 'DMG'];
export const LANGUAGES = ['Español', 'Inglés', 'Japonés', 'Otro'];

// ── BILINGUAL RARITY NORMALIZER ──────────────────────────────────────────────
export const normalizeRarityText = (str) => {
  if (!str) return '';
  const clean = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  
  if (clean.includes('hyper rare') || clean.includes('hyper rara') || clean.includes('rainbow rare')) return 'hyper rara';
  if (clean.includes('gold') || clean.includes('secreta dorada') || clean.includes('rare holo star')) return 'secreta dorada';
  if (clean.includes('secret rare') || clean.includes('ultra rara secreta') || clean.includes('shiny rare')) return 'ultra rara secreta';
  if (clean.includes('special illustration rare') || clean.includes('especial ilustracion rara')) return 'especial ilustracion rara';
  if (clean.includes('illustration rare') || clean.includes('ilustracion rara')) return 'ilustracion rara';
  if (clean.includes('ultra rare') || clean.includes('ultra rara') || clean.includes('shiny ultra rare')) return 'ultra rara';
  if (clean.includes('double rare') || clean.includes('doble rara')) return 'doble rara';
  if (clean.includes('uncommon') || clean.includes('poco comun')) return 'poco comun';
  if (clean.includes('common') || clean.includes('comun')) return 'comun';
  if (clean.includes('rare') || clean.includes('rara') || clean.includes('holo')) return 'rara';

  return clean;
};

// ── RARITY PRIORITY FOR SHOWCASE & CATALOG SORTING ────────────────────────────
export const RARITY_PRIORITY = {
  'hyper rara': 1,
  'hyper rare': 1,
  'secreta dorada': 2,
  'gold': 2,
  'ultra rara secreta': 3,
  'secret rare': 3,
  'shiny rare': 3,
  'especial ilustracion rara': 4,
  'special illustration rare': 4,
  'ilustracion rara': 5,
  'illustration rare': 5,
  'ultra rara': 6,
  'ultra rare': 6,
  'shiny ultra rare': 6,
  'rara': 7,
  'rare': 7,
  'holo': 7,
  'doble rara': 8,
  'double rare': 8,
  'poco comun': 9,
  'uncommon': 9,
  'comun': 10,
  'common': 10
};

// ── SUPERTYPE CLASSIFICATION (Pokemon / Entrenadores / Energias) ──────────────
const TRAINER_EXPLICIT_SET_NUMBERS = new Set([
  'twm-145', 'twm-155', 'twm-156', 'twm-157', 'twm-160', 'twm-163',
  'por-076', 'por-76', 'por-084', 'por-84', 'por-085', 'por-85',
  'pre-103', 'pfl-089', 'pfl-89', 'asc-192', 'meg-119', 'sfa-057', 'sfa-57', 'jtg-146',
  'sv6-180', 'sv6-181', 'sv6-182', 'sv6-183'
]);

const TRAINER_ACTION_SUFFIXES = /\b(encouragement|scouting|tenacity|aid|determination|hospitality|orders|vitality|scenario|conviction|ambition|pride|technique|force|invitation|resolve|dedication|intuition|compassion|sincerity)\b/i;

const EXPLICIT_TRAINER_FULL_NAMES = new Set([
  "judge", "juez", "firebreather", "lana's aid", "lana’s aid", "lillie's determination", "lillie’s determination",
  "lilies determination", "lillie's full force", "erika's hospitality", "hospitalidad de erika",
  "boss's orders", "boss’s orders", "órdenes de jefes", "ordenes de jefes", "grand tree", "gran árbol",
  "gran arbol", "carmine", "carmín", "nemona", "nemonía", "nemonia", "investigación de profesores",
  "professor's research", "professor’s research", "ultra ball", "nido ball", "nest ball", "super ball",
  "great ball", "master ball", "caramelo raro", "rare candy", "cuerda huida", "escape rope",
  "interruptor", "energy switch", "camilla", "super rod", "casco dentado", "capa de valor",
  "piedra sello", "capturador supremo", "prime catcher", "vasija terrestre", "earthen vessel",
  "tambor del despertar", "awakening drum", "artazon", "town store", "jamming tower",
  "neutral center", "dangerous laser", "secret box", "unfair stamp", "sparkling crystal",
  "hyper aroma", "hiperaroma", "pokégear", "pokegear", "pal pad", "buddy-buddy poffin",
  "heavy ball", "switch", "exp. share", "leftovers", "choice belt", "rotom phone",
  "counter catcher", "eerie radar", "counter gain", "gravity stone", "bug catching set",
  "set de caza de bichos", "iono", "hop", "arven", "penny", "sada", "turo", "crispin",
  "kieran", "lacey", "drayton", "amarys", "briar", "cynthia", "steven", "marnie", "serena",
  "rosa", "skyla", "guzma", "colress", "giovanni", "red", "blue", "green", "cyrus", "kukui", "brock"
]);

export function getCardSupertype(card) {
  if (!card) return 'Pokemon';

  const name = (card.name || '').trim();
  const desc = (card.description || '').toLowerCase();
  const setCode = (card.set_code || card.setCode || '').toLowerCase().trim();
  const st = (card.supertype || card.card_type || card.category || '').toLowerCase().trim();

  // 1. Explicit DB field
  if (st === 'trainer' || st === 'entrenador' || st.includes('trainer') || st.includes('entrenador') || st.includes('supporter') || st.includes('item') || st.includes('stadium') || st.includes('tool')) {
    return 'Entrenadores';
  }
  if (st === 'energy' || st === 'energía' || st === 'energia' || st.includes('energy')) {
    return 'Energias';
  }
  if (st === 'pokémon' || st === 'pokemon') {
    return 'Pokemon';
  }

  // 2. Definitive Pokémon traits
  const hasHP = !!card.hp || /\b(hp\s*\d+|\d+\s*hp)\b/i.test(desc) || /\b\d{2,3}\s*hp\b/i.test(name);
  const isPokemonSuffix = /\b(ex|v|vmax|vstar|gx|radiant|radiante|tera|mega)\b/i.test(name);
  const isPokemonTypeDesc = /tipo principal:\s*(fuego|agua|planta|rayo|psíquico|psiquico|lucha|oscuridad|metal|dragón|dragon|incoloro|fire|water|grass|lightning|psychic|fighting|darkness|metal|dragon|colorless)/i.test(desc);

  if (isPokemonSuffix || (hasHP && !TRAINER_ACTION_SUFFIXES.test(name)) || isPokemonTypeDesc || (card.types && card.types.length > 0)) {
    if (!desc.includes('carta entrenador') && !desc.includes('supporter card') && !desc.includes('item card')) {
      return 'Pokemon';
    }
  }

  // 3. Check SetCode-Number Combo
  const numberMatch = name.match(/(\d+)\/(\d+)/) || desc.match(/(\d+)\/(\d+)/);
  if (setCode && numberMatch) {
    const key = `${setCode}-${numberMatch[1]}`;
    const keyPadded = `${setCode}-${numberMatch[1].padStart(3, '0')}`;
    if (TRAINER_EXPLICIT_SET_NUMBERS.has(key) || TRAINER_EXPLICIT_SET_NUMBERS.has(keyPadded)) {
      return 'Entrenadores';
    }
  }

  // 4. Energy Detection
  if (/\b(energía|energia|basic energy|special energy|double turbo|jet energy|reversal energy)\b/i.test(name)) {
    return 'Energias';
  }

  // 5. Trainer Action Suffixes
  if (TRAINER_ACTION_SUFFIXES.test(name)) {
    return 'Entrenadores';
  }

  // 6. Explicit Trainer Full Names
  for (const kw of EXPLICIT_TRAINER_FULL_NAMES) {
    const regex = new RegExp(`\\b${kw.replace(/['']/g, "['']")}\\b`, 'i');
    if (regex.test(name) || regex.test(desc)) {
      const isOwnerPokemon = /['’]s\s+(snorlax|kilowattrel|wattrel|bellibolt|dragonair|alakazam|machamp|garchomp|metagross|pikachu|charizard|bulbasaur|squirtle|eevee|meowth|gengar|pidgeot|slowbro|raichu|clefairy|wooloo|dubwool|zoroark)\b/i.test(name);
      if (isOwnerPokemon) {
        return 'Pokemon';
      }
      return 'Entrenadores';
    }
  }

  if (/\b(supporter|item|stadium|tool|partidario|objeto|estadio|herramienta|ace spec|technical machine)\b/i.test(desc)) {
    return 'Entrenadores';
  }

  return 'Pokemon';
}
