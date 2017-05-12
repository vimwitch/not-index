'use strict';

test(require('../')(__dirname));

require('../')
  .promise(__dirname)
  .then(test);

function test(requires = []) {
  if (requires.length !== 3) throw new Error('Invalid count');
}

console.log('Everything seems to have worked');
