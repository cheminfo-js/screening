import {
  positionToNumber,
  numberToPosition,
  stringToNumber,
  numberToString,
} from '../util';

describe('Test utilities', () => {
  it('check 96 wells stringToNumber', () => {
    expect(stringToNumber('A')).toBe(1);
    expect(stringToNumber('Z')).toBe(26);
    expect(stringToNumber('AA')).toBe(27);
    expect(stringToNumber('BZ')).toBe(78);
  });
  it('check 96 wells numberToString', () => {
    expect(numberToString(1)).toBe('A');
    expect(numberToString(26)).toBe('Z');
    expect(numberToString(27)).toBe('AA');
    expect(numberToString(78)).toBe('BZ');
  });
  it('check 96 wells positionToNumber', () => {
    expect(positionToNumber('A1', 12)).toBe(1);
    expect(positionToNumber('A12', 12)).toBe(12);
    expect(positionToNumber('H1', 12)).toBe(85);
    expect(positionToNumber('H12', 12)).toBe(96);
  });
  it('check 96 wells numberToPosition', () => {
    expect(numberToPosition(1, 12)).toBe('A1');
    expect(numberToPosition(12, 12)).toBe('A12');
    expect(numberToPosition(85, 12)).toBe('H1');
    expect(numberToPosition(96, 12)).toBe('H12');
  });
});
