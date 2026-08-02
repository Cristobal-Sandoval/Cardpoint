import { describe, it, expect } from 'vitest';
import { parseNewsDate } from '../utils/dateUtils';

describe('dateUtils - parseNewsDate', () => {
  it('returns 0 for empty or falsy inputs', () => {
    expect(parseNewsDate('')).toBe(0);
    expect(parseNewsDate(null)).toBe(0);
    expect(parseNewsDate(undefined)).toBe(0);
  });

  it('parses valid ISO and standard date strings', () => {
    const timestamp = parseNewsDate('2025-06-15T12:00:00Z');
    expect(timestamp).toBeGreaterThan(0);
    expect(new Date(timestamp).getUTCFullYear()).toBe(2025);
  });

  it('parses Spanish date strings like "15 de Octubre 2024"', () => {
    const timestamp = parseNewsDate('15 de Octubre 2024');
    expect(timestamp).toBeGreaterThan(0);
    const date = new Date(timestamp);
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(9); // 0-indexed October
    expect(date.getDate()).toBe(15);
  });

  it('parses abbreviated Spanish date strings like "03 dic 2023"', () => {
    const timestamp = parseNewsDate('03 dic 2023');
    expect(timestamp).toBeGreaterThan(0);
    const date = new Date(timestamp);
    expect(date.getFullYear()).toBe(2023);
    expect(date.getMonth()).toBe(11); // 0-indexed December
    expect(date.getDate()).toBe(3);
  });

  it('returns 0 for unrecognized date strings', () => {
    expect(parseNewsDate('invalid date string XYZ')).toBe(0);
  });
});
