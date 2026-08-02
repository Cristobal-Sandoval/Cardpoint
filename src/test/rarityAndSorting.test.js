import { describe, it, expect } from 'vitest';

const normalizeRarityText = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
};

const RARITY_PRIORITY = {
  'hyper rara': 1,
  'secreta dorada': 2,
  'ultra rara secreta': 3,
  'especial ilustracion rara': 4,
  'ilustracion rara': 5,
  'ultra rara': 6,
  'rara': 7,
  'doble rara': 8,
  'poco comun': 9,
  'comun': 10
};

function sortCardsByDefault(cards) {
  return [...cards].sort((a, b) => {
    const normA = normalizeRarityText(a.rarity);
    const normB = normalizeRarityText(b.rarity);
    const pA = RARITY_PRIORITY[normA] || 99;
    const pB = RARITY_PRIORITY[normB] || 99;

    if (pA !== pB) {
      return pA - pB;
    }

    const priceDiff = (b.price || 0) - (a.price || 0);
    if (priceDiff !== 0) return priceDiff;

    return (a.name || '').localeCompare(b.name || '');
  });
}

describe('Rarity Normalization and Card Sorting', () => {
  describe('normalizeRarityText', () => {
    it('handles null, undefined, and empty string', () => {
      expect(normalizeRarityText(null)).toBe('');
      expect(normalizeRarityText(undefined)).toBe('');
      expect(normalizeRarityText('')).toBe('');
    });

    it('strips accents and converts to lowercase', () => {
      expect(normalizeRarityText('Común')).toBe('comun');
      expect(normalizeRarityText('Poco Común')).toBe('poco comun');
      expect(normalizeRarityText('Ilustración Rara')).toBe('ilustracion rara');
      expect(normalizeRarityText('Especial Ilustración Rara')).toBe('especial ilustracion rara');
    });

    it('handles extra spaces and mixed casing', () => {
      expect(normalizeRarityText('  HYPER RARA  ')).toBe('hyper rara');
      expect(normalizeRarityText('Ultra Rara Secreta')).toBe('ultra rara secreta');
    });
  });

  describe('RARITY_PRIORITY map', () => {
    it('prioritizes Hyper Rara over Secreta Dorada over Ultra Rara', () => {
      expect(RARITY_PRIORITY['hyper rara']).toBeLessThan(RARITY_PRIORITY['secreta dorada']);
      expect(RARITY_PRIORITY['secreta dorada']).toBeLessThan(RARITY_PRIORITY['ultra rara secreta']);
      expect(RARITY_PRIORITY['ultra rara secreta']).toBeLessThan(RARITY_PRIORITY['ultra rara']);
      expect(RARITY_PRIORITY['ultra rara']).toBeLessThan(RARITY_PRIORITY['rara']);
      expect(RARITY_PRIORITY['rara']).toBeLessThan(RARITY_PRIORITY['doble rara']);
      expect(RARITY_PRIORITY['doble rara']).toBeLessThan(RARITY_PRIORITY['poco comun']);
      expect(RARITY_PRIORITY['poco comun']).toBeLessThan(RARITY_PRIORITY['comun']);
    });
  });

  describe('sortCardsByDefault', () => {
    it('sorts cards by rarity priority first', () => {
      const cards = [
        { name: 'Pikachu', rarity: 'Común', price: 100 },
        { name: 'Charizard ex', rarity: 'Hyper Rara', price: 50000 },
        { name: 'Mewtwo', rarity: 'Ultra Rara', price: 15000 },
        { name: 'Gengar', rarity: 'Rara', price: 1500 }
      ];

      const sorted = sortCardsByDefault(cards);

      expect(sorted[0].name).toBe('Charizard ex'); // Hyper Rara (priority 1)
      expect(sorted[1].name).toBe('Mewtwo');       // Ultra Rara (priority 6)
      expect(sorted[2].name).toBe('Gengar');       // Rara (priority 7)
      expect(sorted[3].name).toBe('Pikachu');      // Común (priority 10)
    });

    it('sorts cards with equal rarity by price descending', () => {
      const cards = [
        { name: 'Card A', rarity: 'Ultra Rara', price: 10000 },
        { name: 'Card B', rarity: 'Ultra Rara', price: 25000 },
        { name: 'Card C', rarity: 'Ultra Rara', price: 18000 }
      ];

      const sorted = sortCardsByDefault(cards);

      expect(sorted[0].name).toBe('Card B'); // 25000
      expect(sorted[1].name).toBe('Card C'); // 18000
      expect(sorted[2].name).toBe('Card A'); // 10000
    });

    it('sorts cards with equal rarity and price alphabetically by name', () => {
      const cards = [
        { name: 'Zapdos', rarity: 'Rara', price: 2000 },
        { name: 'Articuno', rarity: 'Rara', price: 2000 },
        { name: 'Moltres', rarity: 'Rara', price: 2000 }
      ];

      const sorted = sortCardsByDefault(cards);

      expect(sorted[0].name).toBe('Articuno');
      expect(sorted[1].name).toBe('Moltres');
      expect(sorted[2].name).toBe('Zapdos');
    });
  });
});
