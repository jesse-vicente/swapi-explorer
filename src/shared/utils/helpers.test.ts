import { describe, it, expect } from 'vitest';
import { isEmpty, isUnknown, translate } from '@/shared/utils/helpers';

describe('helpers', () => {
  it('isEmpty should detect empty-like values', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('   ')).toBe(true);
    expect(isEmpty('none')).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('value')).toBe(false);
  });

  it('isUnknown should detect unknown values', () => {
    expect(isUnknown('unknown')).toBe(true);
    expect(isUnknown('n/a')).toBe(true);
    expect(isUnknown('UNKNOWN')).toBe(false);
    expect(isUnknown(undefined)).toBe(false);
  });

  it('translate should map known tokens and keep unknowns', () => {
    expect(translate('arid, temperate')).toBe('Árido, Temperado');
    expect(translate('desert/jungle')).toBe('Deserto, Selva');
    expect(translate('blue, purple, teal')).toBe('Azul, Roxo, teal');
    expect(translate(undefined)).toBe('—');
  });
});
