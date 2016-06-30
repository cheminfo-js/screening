'use strict';

class Screening {
    constructor(options) {
        options = options || {};
        this.width = options.width || 12;
        this.height = this.width / 3 * 2;
        this.size = this.width * this.height;
    }

    /*
    Convert 'A5' to
     */
    positionToNumber(position) {
        position=position.toUpperCase().replace(/[^0-9A-Z]/g,'');
        var string=position.replace(/[0-9]+/,'');
        var number=position.replace(/[A-Z]+/,'');
        return (this.stringToNumber(string)-1)*this.width+(number*1);
    }

    numberToPosition(number) {

    }

    stringToNumber(string) {
        var number = 0;
        for (var i=0; i<string.length; i++) {
            number *= 26;
            number += string.charCodeAt(i)-64;
        }
        return number;
    }

    numberToString(number) {
        var string='';
        while (number!=0) {
            string = String.fromCharCode((number-1)%26+65) + string;
            number = Math.floor((number-1)/26);
        }
        return string;
    }
}



module.exports = Screening;
