import { describe, it, expect } from 'vitest';
import { formatNumber } from '@/shared/utils/formatting';
import { TRANSLATIONS } from '@/shared/utils/translations';

describe('shared/utils/formatting', () => {
  it('returns Desconhecido for unknown and n/a', () => {
    expect(formatNumber('unknown')).toBe(TRANSLATIONS.unknown);
    expect(formatNumber('n/a')).toBe(TRANSLATIONS.unknown);
  });

  it('returns original value when not a number', () => {
    expect(formatNumber('abc')).toBe('abc');
  });

  it('formats numeric strings to pt-BR', () => {
    expect(formatNumber('1000')).toBe('1.000');
    expect(formatNumber('1234567')).toBe('1.234.567');
  });
});
