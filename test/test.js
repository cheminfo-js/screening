'use strict';

var Util = require('..').Util;

describe('Test utilities', function () {
    it('check 96 wells stringToNumber', function() {
        Util.stringToNumber('A').should.equal(1);
        Util.stringToNumber('Z').should.equal(26);
        Util.stringToNumber('AA').should.equal(27);
        Util.stringToNumber('BZ').should.equal(78);
    });
    it('check 96 wells numberToString', function() {
        Util.numberToString(1).should.equal('A');
        Util.numberToString(26).should.equal('Z');
        Util.numberToString(27).should.equal('AA');
        Util.numberToString(78).should.equal('BZ');
    });
    it('check 96 wells positionToNumber', function() {
        Util.positionToNumber('A1',12).should.equal(1);
        Util.positionToNumber('A12',12).should.equal(12);
        Util.positionToNumber('H1',12).should.equal(85);
        Util.positionToNumber('H12',12).should.equal(96);
    });
    it('check 96 wells positionToNumber', function() {
        Util.numberToPosition(1,12).should.equal('A1');
        Util.numberToPosition(12,12).should.equal('A12');
        Util.numberToPosition(85,12).should.equal('H1');
        Util.numberToPosition(96,12).should.equal('H12');
    })
});