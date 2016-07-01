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

    select(range) {
        if (range) {
            this.wells.forEach(function(well) {
                well.selected=false;
            });
            var reg = /(\d+)(-(\d+))?,?/g;
            var m;
            while(m = reg.exec(range)) {
                var from = +m[1];
                var to = +m[3];
                if(to && from <= to) {
                    for (var i=from; i<=to; i++) {
                        var well = this.wells[i-1];
                        if (! isEmpty(well.info)) well.selected=true;
                    }
                } else {
                    var well = this.wells[from-1];
                    if (! isEmpty(well.info)) well.selected=true;
                }
            }
        } else {
            this.wells.forEach(function(well) {
                if (isEmpty(well.info)) {
                    well.selected=false;
                } else {
                    well.selected=true;
                }
            });
        }
    }

    getArrayElement(index) {
        return this.wells[index];
    }

    updateColor(options) {
        this.wells.forEach(function(well) {
            if (isEmpty(well.info)) {
                well.color='white';
            } else if (well.selected) {
                well.info.color= 'rgba(144, 238, 144, 1)';
            } else {
                well.info.color='rgba(144, 238, 144, 0.3)';
            }
        })
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

function isEmpty(object) {
    var isEmpty = Object.keys(object).length === 0 && object.constructor === Object;
    return isEmpty;
}

module.exports=Plate;
