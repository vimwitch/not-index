'use strict';

const requires = require('../')(__dirname);

if (requires.length !== 3) throw new Error('Invalid count');
