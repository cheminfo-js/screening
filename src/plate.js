import { positionToNumber, numberToPosition } from './util.js';

/**
 * Class dealing with plates
 * @param {object} [options={}]
 * @param {number} [options.width=12] width of the plate
 * @param {number} [options.height=options.width/3*2] height of the plase
 * @param {number} [options.size=options.width*options.height] size of the plate
 */
export class Plate {
  constructor(options = {}) {
    this.width = options.width || 12;
    this.height = options.height || (this.width / 3) * 2;
    this.size = this.width * this.height;
    this.initialize();
  }

  getWells() {
    return this.wells;
  }

  select(range) {
    if (range) {
      this.wells.forEach(function (well) {
        well.selected = false;
      });
      let reg = /(\d+)(-(\d+))?,?/g;
      let m;
      while ((m = reg.exec(range))) {
        let from = +m[1];
        let to = +m[3];
        if (to && from <= to) {
          for (let i = from; i <= to; i++) {
            let well = this.wells[i - 1];
            if (!isEmpty(well.info)) well.selected = true;
          }
        } else {
          let well = this.wells[from - 1];
          if (!isEmpty(well.info)) well.selected = true;
        }
      }
    } else {
      this.wells.forEach(function (well) {
        if (isEmpty(well.info)) {
          well.selected = false;
        } else {
          well.selected = true;
        }
      });
    }
  }

  getArrayElement(index) {
    return this.wells[index];
  }

  updateColor() {
    this.wells.forEach(function (well) {
      if (isEmpty(well.info)) {
        well.color = 'white';
      } else if (well.selected) {
        well.info.color = 'rgba(144, 238, 144, 1)';
      } else {
        well.info.color = 'rgba(144, 238, 144, 0.3)';
      }
    });
  }

  getByPosition(position) {
    return this.wells[positionToNumber(position, this.width) - 1];
  }

  getByNumber(number) {
    return this.wells[number - 1];
  }

  initialize() {
    this.wells = new Array(this.size);
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        let i = row * this.width + column;
        this.wells[i] = {
          number: i + 1,
          position: numberToPosition(i + 1, this.width),
          info: {},
        };
      }
    }
  }
}

function isEmpty(object) {
  let empty = Object.keys(object).length === 0 && object.constructor === Object;
  return empty;
}
