import { Plate } from '../plate';

describe('Test plate 2 x 3', () => {
  let plate = new Plate({ height: 2, width: 3 });
  it('check 6 wells plate', () => {
    expect(plate.wells).toHaveLength(6);
    expect(plate.size).toBe(6);
    expect(plate.width).toBe(3);
    expect(plate.height).toBe(2);
    expect(plate.wells[5]).toStrictEqual({
      number: 6,
      position: 'B3',
      info: {},
    });
  });
});
