'use strict';

var Plate = require('..').Plate;

describe('Test plate 2 x 3', function () {
    var plate=new Plate({height:2, width:3});
    it('check 6 wells plate', function() {
        plate.data.length.should.equal(6);
        plate.size.should.equal(6);
        plate.width.should.equal(3);
        plate.height.should.equal(2);
        plate.data[5].should.eql({ number: 6, position: 'B3', value: {} } );
    });
});