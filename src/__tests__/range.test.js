import { Plate } from '../plate';

describe('Test range', () => {
  let plate = new Plate();
  let wells = plate.wells;
  for (let i = 0; i < wells.length; i = i + 2) {
    wells[i].info = { reference: i };
  }

  plate.select('1-10 20 21 40-50');

  let selected = 0;
  plate.wells.forEach(function (well) {
    if (well.selected) selected++;
  });

  it('ccheck selected', () => {
    expect(selected).toBe(11);
  });
});
