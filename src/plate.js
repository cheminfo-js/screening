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

    getData() {
        return this.data;
    }

    get(index) {
        return this.data[index-1];
    }

    getByPosition(position) {
        return this.data[this.positionToNumber(position, this.width)-1];
    }

    getByNumber(number) {
        return this.data[number-1];
    }

    initialize() {
        this.data=new Array(this.size);
        for (var row=0; row<this.height; row++) {
            for (var column=0; column<this.width; column++) {
                var i=row*this.width+column;
                this.data[i]={
                    number: i+1,
                    position: Util.numberToPosition(i+1, this.width),
                    info: {}
                };
            }
        }
        console.log('done');
    }
}



module.exports=Plate;
