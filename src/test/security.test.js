import { describe, it, expect } from 'vitest';
import {
  sanitizeExternalHtml,
  timingSafeEqual,
  isValidTrackingId,
} from '../utils/security';

describe('security - sanitizeExternalHtml', () => {
  it('removes script and iframe tags', () => {
    const out = sanitizeExternalHtml('<p>Hola</p><script>alert(1)</script><iframe src="x"></iframe>');
    expect(out).not.toContain('<script');
    expect(out).not.toContain('<iframe');
    expect(out).toContain('<p>Hola</p>');
  });

  it('strips event handler attributes', () => {
    const out = sanitizeExternalHtml('<p onclick="alert(1)" onload="x()">Texto</p>');
    expect(out).not.toContain('onclick');
    expect(out).not.toContain('onload');
    expect(out).toContain('Texto');
  });

  it('neutralizes javascript: urls', () => {
    const out = sanitizeExternalHtml('<a href="javascript:alert(1)">click</a>');
    expect(out).not.toContain('javascript:');
  });

  it('returns empty string for non-strings', () => {
    expect(sanitizeExternalHtml(null)).toBe('');
    expect(sanitizeExternalHtml(undefined)).toBe('');
  });
});

describe('security - timingSafeEqual', () => {
  it('compares equal strings', () => {
    expect(timingSafeEqual('abc123', 'abc123')).toBe(true);
  });

  it('rejects different or empty strings', () => {
    expect(timingSafeEqual('abc', 'abd')).toBe(false);
    expect(timingSafeEqual('', '')).toBe(false);
    expect(timingSafeEqual('a', 'ab')).toBe(false);
  });
});

describe('security - isValidTrackingId', () => {
  it('accepts valid formats', () => {
    expect(isValidTrackingId('gtm', 'GTM-ABC123')).toBe(true);
    expect(isValidTrackingId('pixel', '123456789012345')).toBe(true);
    expect(isValidTrackingId('clarity', 'xfheeraaaz')).toBe(true);
  });

  it('rejects placeholders and injections', () => {
    expect(isValidTrackingId('gtm', 'YOUR_GTM_ID_HERE')).toBe(false);
    expect(isValidTrackingId('pixel', '"><script>alert(1)</script>')).toBe(false);
    expect(isValidTrackingId('clarity', '')).toBe(false);
    expect(isValidTrackingId('gtm', null)).toBe(false);
  });
});
