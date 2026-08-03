import { describe, it, expect } from 'vitest';
import { getCardSupertype } from '../App';

describe('getCardSupertype Master Classifier', () => {
  it('correctly classifies Trainer cards from set/number patterns and names', () => {
    const trainerCards = [
      { name: "TWMes,155/167,1,500,NM", set_code: "twm" },
      { name: "PORla,084/088,1,1000,reverse", set_code: "por" },
      { name: "PORen,084/088,1,500", set_code: "por" },
      { name: "PREes,103/131,1,500", set_code: "pre" },
      { name: "TWMes,145/167,3,500,liga", set_code: "twm" },
      { name: "PORen,076/088,1,500", set_code: "por" },
      { name: "PORla,076/088,3,500", set_code: "por" },
      { name: "PFLla,089/094,1,500", set_code: "pfl" },
      { name: "ASCla,192/217,1,500", set_code: "asc" },
      { name: "MEGen,119/132,1,500", set_code: "meg" },
      { name: "MEGla,119/132,4,500", set_code: "meg" },
      { name: "SFAes,057/064,1,500", set_code: "sfa" },
      { name: "JTGla,146/159,3,500", set_code: "jtg" },
      { name: "Grand Tree" },
      { name: "Lana's Aid" },
      { name: "Lillie's Determination" },
      { name: "Investigación de Profesores" },
      { name: "Juez" },
      { name: "Ultra Ball" }
    ];

    trainerCards.forEach(card => {
      expect(getCardSupertype(card)).toBe('Entrenadores');
    });
  });

  it('correctly classifies Pokémon cards without misidentifying them as Trainers', () => {
    const pokemonCards = [
      { name: "Hop's Snorlax" },
      { name: "Iono's Kilowattrel" },
      { name: "Cascoon", description: "Información oficial de la carta Cascoon. Tipo principal: Grass." },
      { name: "Capakid", description: "Información oficial de la carta Capakid. Tipo principal: Water." },
      { name: "Charizard ex", description: "Información oficial de la carta Charizard ex. Tipo principal: Fire." },
      { name: "Pikachu", description: "Información oficial de la carta Pikachu. Tipo principal: Lightning." },
      { name: "Mewtwo ex", description: "Información oficial." }
    ];

    pokemonCards.forEach(card => {
      expect(getCardSupertype(card)).toBe('Pokemon');
    });
  });

  it('correctly classifies Energy cards', () => {
    const energyCards = [
      { name: "Energía Réplica" },
      { name: "Basic Energy Grass" },
      { name: "Jet Energy" }
    ];

    energyCards.forEach(card => {
      expect(getCardSupertype(card)).toBe('Energias');
    });
  });
});
