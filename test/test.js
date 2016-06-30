'use strict';

var Screening = require('..');

describe('Test screening class', function () {
    it('check 96 wells', function() {
        var screening = new Screening();
        
        screening.stringToNumber('A').should.equal(1);
        screening.stringToNumber('Z').should.equal(26);
        screening.stringToNumber('AA').should.equal(27);
        screening.stringToNumber('BZ').should.equal(78);
        
        screening.numberToString(1).should.equal('A');
        screening.numberToString(26).should.equal('Z');
        screening.numberToString(27).should.equal('AA');
        screening.numberToString(78).should.equal('BZ');

        screening.positionToNumber('A1').should.equal(1);
        screening.positionToNumber('A12').should.equal(12);
        screening.positionToNumber('H1').should.equal(85);
        screening.positionToNumber('H12').should.equal(96);
    })
});