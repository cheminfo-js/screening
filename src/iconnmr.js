'use strict'

var Util=require('./util.js');


/*
options:
- eol : end of line delimiter (Default: \r\n)
- plateNumber : the position of the plate (Default: 1)
- deleteExistingHolder : flag specifying if existing experiments should be deleted (Default: false)
- autosubmit : submit automatically (Default: false)
 */

function generateFile (requests, options) {
    var options = options || {};
    var EOL = options.eol || "\r\n";
    var plateNumber = options.plateNumber || 1;
    var textFile = [];

    for (var request of requests) {
        var holder=getHolder(request.position, plateNumber);
        var experimentNumber=getExperimentNumber(request.position);
        if (options.deleteExistingHolder) {
            textFile.push("USER "+request.user);
            textFile.push("HOLDER "+holder);
            textFile.push("DELETE"); // this is required to delete already existing entries
        }
        textFile.push("USER "+request.user);
        textFile.push("HOLDER "+holder);
        if (! options.autosubmit) textFile.push("NO_SUBMIT");
        textFile.push("NAME "+request.name);
        textFile.push("TITLE "+request.title);
        for (var experiment of request.experiments) {
            textFile.push("EXPNO "+experimentNumber++);
            textFile.push("SOLVENT "+experiment.solvent);
            textFile.push("EXPERIMENT "+experiment.experiment);
            if (experiment.parameters && experiment.parameters.length>0) {
                var parameters=[];
                for (var parameter of experiment.parameters) {
                    parameters.push(parameter.label, parameter.value);
                }
                textFile.push("PARAMETERS "+parameters.join(','));
            }
        }
        textFile.push("");
    }
    return textFile.join(EOL);
}

function getHolder(position, plateNumber) {
    return plateNumber*100+Util.positionToNumber(position, 12);
}

function getExperimentNumber(position) {
    return Util.positionToNumber(position, 12)*10;
}

module.exports={
    generateFile
}