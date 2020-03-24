import { positionToNumber } from './util.js';

/*
options:
- eol : end of line delimiter (Default: \r\n)
- plateNumber : the position of the plate (Default: 1)
- deleteExistingHolder : flag specifying if existing experiments should be deleted (Default: false)
- autosubmit : submit automatically (Default: false)
 */

export function generateFile(requests, options = {}) {
  const EOL = options.eol || '\r\n';
  const { plateNumber = 1 } = options;
  let textFile = [];

  for (let request of requests) {
    let holder = getHolder(request.position, plateNumber);
    let experimentNumber = getExperimentNumber(request.position);
    if (options.deleteExistingHolder) {
      textFile.push(`USER ${request.user}`);
      textFile.push(`HOLDER ${holder}`);
      textFile.push('DELETE'); // this is required to delete already existing entries
    }
    textFile.push(`USER ${request.user}`);
    textFile.push(`HOLDER ${holder}`);
    if (!options.autosubmit) textFile.push('NO_SUBMIT');
    textFile.push(`NAME ${request.name}`);
    textFile.push(`TITLE ${request.title}`);
    for (let experiment of request.experiments) {
      textFile.push(`EXPNO ${experimentNumber++}`);
      textFile.push(`SOLVENT ${experiment.solvent}`);
      textFile.push(`EXPERIMENT ${experiment.experiment}`);
      if (experiment.parameters && experiment.parameters.length > 0) {
        let parameters = [];
        for (let parameter of experiment.parameters) {
          parameters.push(parameter.label, parameter.value);
        }
        textFile.push(`PARAMETERS ${parameters.join(',')}`);
      }
    }
    textFile.push('');
  }
  return textFile.join(EOL);
}

function getHolder(position, plateNumber) {
  return plateNumber * 100 + positionToNumber(position, 12);
}

function getExperimentNumber(position) {
  return positionToNumber(position, 12) * 10;
}
