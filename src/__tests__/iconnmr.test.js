import { readFileSync } from 'fs';
import { join } from 'path';

import { generateFile } from '../iconnmr';

describe('ICONNmr', () => {
  it('generateFile', () => {
    let requests = JSON.parse(
      readFileSync(join(__dirname, './file/iconnmr.json')),
    );

    let options = {
      eol: '\r\n',
      plateNumber: 1,
      deleteExistingHolder: false,
    };

    let result = generateFile(requests, options);

    expect(result).toMatchSnapshot();
  });
});
