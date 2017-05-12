'use strict';

test(require('../')(__dirname));

require('../')
  .promise(__dirname)
  .then(test)
  .catch(err => console.log(`Error in async test`, err));

function test(requires = []) {
  if (requires.length !== 3) throw new Error('Invalid count');
}
