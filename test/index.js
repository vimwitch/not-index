'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const syncPromise = Promise.resolve()
  .then(() => require('../')(__dirname))
  .then(test);

const promise = require('../')
  .promise(__dirname)
  .then(test);

function test(requires = {}) {
  if (_.keys(requires).length !== 3) throw new Error('Invalid count');
  _.forEach(requires, (value, name) => {
    if (!value) throw new Error(`Bad value found in file ${name}`);
    const req = require(path.join(__dirname, `${name}.js`));
    if (req !== value) throw new Error('Value mismatch');
  });
}

Promise.all([syncPromise, promise])
  .then(() => console.log('Everything seems to have worked'))
  .catch(err => console.log('Error in tests', err));
