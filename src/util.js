'use strict'

/*
 Convert 'A5' to
 */
function positionToNumber(position, width) {
    if (width===undefined) throw Error('need to specify width for numberToPosition');
    position=position.toUpperCase().replace(/[^0-9A-Z]/g,'');
    var string=position.replace(/[0-9]+/,'');
    var number=position.replace(/[A-Z]+/,'');
    return (stringToNumber(string)-1)*width+(number*1);
}

function numberToPosition(number, width) {
    if (width===undefined) throw Error('need to specify width for numberToPosition');
    number--;
    return numberToString(Math.floor(number/width)+1)+(number%width+1);
}

function stringToNumber(string) {
    var number = 0;
    for (var i=0; i<string.length; i++) {
        number *= 26;
        number += string.charCodeAt(i)-64;
    }
    return number;
}

function numberToString(number) {
    var string='';
    while (number!=0) {
        string = String.fromCharCode((number-1)%26+65) + string;
        number = Math.floor((number-1)/26);
    }
    return string;
}

module.exports = {
    numberToString: numberToString,
    stringToNumber: stringToNumber,
    numberToPosition: numberToPosition,
    positionToNumber: positionToNumber
}