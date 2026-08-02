import { describe, it, expect } from 'vitest';

const parseRarityPrefix = (prefix) => {
  if (!prefix) return null;
  const p = prefix.trim().toUpperCase();
  switch (p) {
    case 'C': return 'Común';
    case 'PC':
    case 'U': return 'Poco Común';
    case 'R': return 'Rara';
    case 'RR': return 'Doble Rara';
    case 'UR': return 'Ultra Rara';
    case 'IR':
    case 'AR': return 'Ilustración Rara';
    case 'SIR': return 'Especial Ilustración Rara';
    case 'SR':
    case 'URS': return 'Ultra Rara Secreta';
    case 'GR':
    case 'SD': return 'Secreta Dorada';
    case 'HR': return 'Hyper Rara';
    default:
      const lower = prefix.toLowerCase();
      if (lower.includes('común') || lower.includes('comun')) return 'Común';
      if (lower.includes('poco')) return 'Poco Común';
      if (lower.includes('doble')) return 'Doble Rara';
      if (lower.includes('especial')) return 'Especial Ilustración Rara';
      if (lower.includes('ilustración') || lower.includes('ilustracion')) return 'Ilustración Rara';
      if (lower.includes('secreta') && lower.includes('ultra')) return 'Ultra Rara Secreta';
      if (lower.includes('dorada')) return 'Secreta Dorada';
      if (lower.includes('hyper')) return 'Hyper Rara';
      if (lower.includes('ultra')) return 'Ultra Rara';
      if (lower.includes('rara')) return 'Rara';
      return null;
  }
};

const parseImportLine = (line, fallbackLanguage = 'Español') => {
  const trimmed = line.trim();
  if (!trimmed) return null;

  let parts = [];
  if (trimmed.includes('|')) {
    parts = trimmed.split('|').map(p => p.trim()).filter(Boolean);
  } else if (trimmed.includes(',')) {
    parts = trimmed.split(',').map(p => p.trim()).filter(Boolean);
  }

  let name = '';
  let setCodeRaw = '';
  let numberRaw = '';
  let stock = 1;
  let price = 0;
  let condition = 'NM';
  let extraTokens = [];

  if (parts.length >= 2) {
    const isStandardThreePart = parts.length >= 3 && /^[a-z0-9]{2,6}$/i.test(parts[1]) && /^(\d+|[a-z0-9-]+)(\/\d+)?$/i.test(parts[2]);
    const isFirstPartSetCode = /^[a-z0-9]{2,6}$/i.test(parts[0]) && /^(\d+|[a-z0-9-]+)(\/\d+)?$/i.test(parts[1]) && !isStandardThreePart;

    if (isFirstPartSetCode) {
      setCodeRaw = parts[0];
      numberRaw = parts[1];
      if (parts[2]) stock = parseInt(parts[2], 10) || 1;
      if (parts[3]) price = parseInt(parts[3].replace(/[$.]/g, ''), 10) || 0;
      if (parts[4]) condition = parts[4];
      extraTokens = parts.slice(5);
    } else if (parts.length >= 3) {
      name = parts[0];
      setCodeRaw = parts[1];
      numberRaw = parts[2];
      if (parts[3]) stock = parseInt(parts[3], 10) || 1;
      if (parts[4]) price = parseInt(parts[4].replace(/[$.]/g, ''), 10) || 0;
      if (parts[5]) condition = parts[5];
      extraTokens = parts.slice(6);
    } else {
      setCodeRaw = parts[0];
      numberRaw = parts[1];
    }
  } else {
    const tokens = trimmed.split(/\s+/);
    if (tokens.length === 2) {
      setCodeRaw = tokens[0];
      numberRaw = tokens[1];
    } else if (tokens.length === 3 && /^\d+$/.test(tokens[0])) {
      stock = parseInt(tokens[0], 10) || 1;
      setCodeRaw = tokens[1];
      numberRaw = tokens[2];
    } else if (tokens.length >= 3) {
      numberRaw = tokens[tokens.length - 1];
      setCodeRaw = tokens[tokens.length - 2];

      let startIndex = 0;
      if (/^\d+$/.test(tokens[0])) {
        stock = parseInt(tokens[0], 10) || 1;
        startIndex = 1;
      }
      name = tokens.slice(startIndex, tokens.length - 2).join(' ');
    } else {
      return null;
    }
  }

  if (!setCodeRaw || !numberRaw) return null;

  let setCode = setCodeRaw.toLowerCase();
  let number = numberRaw.split('/')[0].trim();
  if (/^0+[1-9]\d*$/.test(number)) {
    number = number.replace(/^0+/, '');
  } else if (/^0+$/.test(number)) {
    number = '0';
  }

  const normCond = condition.trim().toUpperCase();
  if (['NM', 'LP', 'MP', 'HP', 'DMG'].includes(normCond)) {
    condition = normCond;
  } else if (normCond === 'DAMAGED') {
    condition = 'DMG';
  }

  let idioma = fallbackLanguage;
  if (setCode.endsWith('la') && setCode.length > 2) {
    setCode = setCode.slice(0, -2);
    idioma = 'Español';
  } else if (setCode.endsWith('es') && setCode.length > 2) {
    setCode = setCode.slice(0, -2);
    idioma = 'Español';
  } else if (setCode.endsWith('en') && setCode.length > 2) {
    setCode = setCode.slice(0, -2);
    idioma = 'Inglés';
  } else if (setCode.endsWith('jp') && setCode.length > 2) {
    setCode = setCode.slice(0, -2);
    idioma = 'Japonés';
  } else if (setCode.endsWith('pt') && setCode.length > 2) {
    setCode = setCode.slice(0, -2);
    idioma = 'Portugués';
  }

  const setCodeMapping = {
    'svi': 'sv1', 'sv01': 'sv1',
    'pal': 'sv2', 'sv02': 'sv2',
    'obf': 'sv3', 'sv03': 'sv3',
    'mew': 'sv3pt5', '151': 'sv3pt5', 'sv35': 'sv3pt5',
    'par': 'sv4', 'sv04': 'sv4',
    'paf': 'sv4pt5', 'sv45': 'sv4pt5',
    'tef': 'sv5', 'sv05': 'sv5',
    'twm': 'sv6', 'sv06': 'sv6',
    'sfa': 'sv6pt5', 'sv65': 'sv6pt5',
    'ste': 'sv7', 'scr': 'sv7', 'sv07': 'sv7',
    'ssp': 'sv8', 'sv08': 'sv8',
    'pre': 'sv8pt5', 'sv85': 'sv8pt5',
    'ssh': 'swsh1', 'rcl': 'swsh2', 'daa': 'swsh3', 'cpa': 'swsh3pt5',
    'vivid': 'swsh4', 'vv': 'swsh4', 'shf': 'swsh4pt5', 'bst': 'swsh5',
    'cre': 'swsh6', 'evs': 'swsh7', 'fs': 'swsh8', 'brs': 'swsh9',
    'asr': 'swsh10', 'lor': 'swsh11', 'sit': 'swsh12', 'crz': 'swsh12pt5', 'cz': 'swsh12pt5'
  };

  for (const [key, val] of Object.entries(setCodeMapping)) {
    if (setCode.startsWith(key)) {
      setCode = val;
      break;
    }
  }

  let is_reverse = false;
  let is_league = false;
  let overriddenRarity = null;
  const checkTokens = [...parts.slice(3), ...extraTokens];
  for (const val of checkTokens) {
    if (val) {
      const lowerVal = String(val).trim().toLowerCase();
      if (lowerVal === 'reverse' || lowerVal === 'rev') is_reverse = true;
      else if (lowerVal === 'liga' || lowerVal === 'league' || lowerVal === 'de liga') is_league = true;
      else if (lowerVal === 'es' || lowerVal.includes('español')) idioma = 'Español';
      else if (lowerVal === 'en' || lowerVal.includes('ingles') || lowerVal.includes('inglés')) idioma = 'Inglés';
      else if (lowerVal === 'jp' || lowerVal.includes('japones') || lowerVal.includes('japonés')) idioma = 'Japonés';
      else {
        const matchedRarity = parseRarityPrefix(val);
        if (matchedRarity) overriddenRarity = matchedRarity;
      }
    }
  }

  return {
    name: name.trim(),
    setCode,
    rawSetCode: setCodeRaw.toLowerCase(),
    number,
    stock,
    price,
    condition,
    idioma,
    is_reverse,
    is_league,
    overriddenRarity
  };
};

describe('parseImportLine - Batch Import Line Parser', () => {
  describe('Code-only input formats', () => {
    it('parses "MegEn 18" correctly with English language suffix', () => {
      const result = parseImportLine('MegEn 18');
      expect(result).not.toBeNull();
      expect(result.setCode).toBe('meg');
      expect(result.number).toBe('18');
      expect(result.idioma).toBe('Inglés');
      expect(result.stock).toBe(1);
    });

    it('parses "WHITla 018" correctly with LatAm Spanish language suffix and strips leading zeros', () => {
      const result = parseImportLine('WHITla 018');
      expect(result).not.toBeNull();
      expect(result.setCode).toBe('whit');
      expect(result.number).toBe('18'); // 018 -> 18
      expect(result.idioma).toBe('Español');
    });

    it('parses quantity prefix: "1 MegEn 18"', () => {
      const result = parseImportLine('1 MegEn 18');
      expect(result).not.toBeNull();
      expect(result.stock).toBe(1);
      expect(result.setCode).toBe('meg');
      expect(result.number).toBe('18');
    });
  });

  describe('Case-insensitivity', () => {
    it('treats uppercase, lowercase, and mixed-case set codes identically', () => {
      const r1 = parseImportLine('MegEn 18');
      const r2 = parseImportLine('megen 18');
      const r3 = parseImportLine('MEGEN 18');

      expect(r1.setCode).toBe(r2.setCode);
      expect(r2.setCode).toBe(r3.setCode);
      expect(r1.idioma).toBe('Inglés');
      expect(r2.idioma).toBe('Inglés');
      expect(r3.idioma).toBe('Inglés');
    });

    it('handles uppercase and lowercase set codes for TWM / twm / Twm', () => {
      const r1 = parseImportLine('TWM 180');
      const r2 = parseImportLine('twm 180');
      expect(r1.setCode).toBe('sv6');
      expect(r2.setCode).toBe('sv6');
    });
  });

  describe('Language suffix detection', () => {
    it('detects "la" suffix as Español', () => {
      const res = parseImportLine('WHITla 018');
      expect(res.idioma).toBe('Español');
      expect(res.setCode).toBe('whit');
    });

    it('detects "es" suffix as Español', () => {
      const res = parseImportLine('MEGes 18');
      expect(res.idioma).toBe('Español');
      expect(res.setCode).toBe('meg');
    });

    it('detects "en" suffix as Inglés', () => {
      const res = parseImportLine('MEGen 18');
      expect(res.idioma).toBe('Inglés');
      expect(res.setCode).toBe('meg');
    });

    it('detects "jp" suffix as Japonés', () => {
      const res = parseImportLine('PREjp 001');
      expect(res.idioma).toBe('Japonés');
      expect(res.setCode).toBe('sv8pt5');
    });
  });

  describe('Set Code Mappings', () => {
    it('maps official set abbreviations correctly', () => {
      expect(parseImportLine('svi 1').setCode).toBe('sv1');
      expect(parseImportLine('pal 1').setCode).toBe('sv2');
      expect(parseImportLine('obf 1').setCode).toBe('sv3');
      expect(parseImportLine('151 1').setCode).toBe('sv3pt5');
      expect(parseImportLine('par 1').setCode).toBe('sv4');
      expect(parseImportLine('paf 1').setCode).toBe('sv4pt5');
      expect(parseImportLine('tef 1').setCode).toBe('sv5');
      expect(parseImportLine('twm 1').setCode).toBe('sv6');
      expect(parseImportLine('sfa 1').setCode).toBe('sv6pt5');
      expect(parseImportLine('ste 1').setCode).toBe('sv7');
      expect(parseImportLine('ssp 1').setCode).toBe('sv8');
      expect(parseImportLine('pre 1').setCode).toBe('sv8pt5');
    });
  });

  describe('PTCGL / Standard Decklist Formats', () => {
    it('parses "4 Carmine TWM 180"', () => {
      const res = parseImportLine('4 Carmine TWM 180');
      expect(res).not.toBeNull();
      expect(res.name).toBe('Carmine');
      expect(res.setCode).toBe('sv6');
      expect(res.number).toBe('180');
      expect(res.stock).toBe(4);
    });

    it('parses "Carmine | twm | 180 | 1 | 5000"', () => {
      const res = parseImportLine('Carmine | twm | 180 | 1 | 5000');
      expect(res).not.toBeNull();
      expect(res.name).toBe('Carmine');
      expect(res.setCode).toBe('sv6');
      expect(res.number).toBe('180');
      expect(res.stock).toBe(1);
      expect(res.price).toBe(5000);
    });
  });

  describe('Flags & Rarity Overrides', () => {
    it('detects reverse and league flags case-insensitively', () => {
      const res = parseImportLine('MegEn | 18 | 1 | 1000 | NM | Inglés | reverse | liga');
      expect(res.is_reverse).toBe(true);
      expect(res.is_league).toBe(true);
    });

    it('detects custom rarity prefixes like UR, SIR, SD', () => {
      expect(parseRarityPrefix('UR')).toBe('Ultra Rara');
      expect(parseRarityPrefix('ur')).toBe('Ultra Rara');
      expect(parseRarityPrefix('SIR')).toBe('Especial Ilustración Rara');
      expect(parseRarityPrefix('SD')).toBe('Secreta Dorada');
    });
  });
});
