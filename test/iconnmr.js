'use strict';

var IconNMR = require('..').IconNMR;
var FS = require('fs');

describe('Test topspin conversion', function () {
    var requests=JSON.parse(FS.readFileSync('./test/file/iconnmr.json'));
    var correctResult=FS.readFileSync('./test/file/iconnmr.txt','utf8');
    
    
    var options={
            eol: '\r\n',
            plateNumber: 1,
            deleteExistingHolder: false
    };
    
    var result=IconNMR.generateFile(requests, options);
    
    result.should.be.equal(correctResult);
});