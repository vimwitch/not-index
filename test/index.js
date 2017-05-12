'use strict';

const requires = require('../')(__dirname);

console.log(requires);

if (requires.length !== 3) throw new Error('Invalid count');
