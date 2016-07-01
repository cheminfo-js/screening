'use strict';

var Util=require('./util.js');

/*
index starts at 1 !

 */

class Plate {
    constructor(options) {
        options = options || {};
        
        this.width = options.width || 12;
        this.height = options.height || this.width / 3 * 2;
        this.size = this.width * this.height;
        this.initialize();
    }

    getWells() {
        return this.wells;
    }

    get(index) {
        return this.wells[index-1];
    }

    getByPosition(position) {
        return this.wells[Util.positionToNumber(position, this.width)-1];
    }

    getByNumber(number) {
        return this.wells[number-1];
    }

    initialize() {
        this.wells=new Array(this.size);
        for (var row=0; row<this.height; row++) {
            for (var column=0; column<this.width; column++) {
                var i=row*this.width+column;
                this.wells[i]={
                    number: i+1,
                    position: Util.numberToPosition(i+1, this.width),
                    info: {}
                };
            }
        }
    }
}



module.exports=Plate;
