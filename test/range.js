'use strict';

var Plate = require('..').Plate;

describe('Test range', function () {
    var plate=new Plate();
    var wells=plate.wells;
    for (var i=0; i<wells.length; i=i+2) {
        wells[i].info={"reference": i}
    }

    plate.select('1-10 20 21 40-50');

    var selected=0;
    plate.wells.forEach(function(well) {
        if (well.selected) selected++;
    });
    
    it('ccheck selected', function() {
        selected.should.equal(11);
    });
});