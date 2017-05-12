'use strict';

const fs = require('fs');
const path = require('path');
const map = require('lodash.map');
const filter = require('lodash.filter');

function notIndex(dirname, filenames = [], regex = /^(?!index)[a-z\-]+\.js$/) {
  let output = filenames;
  output = filter(filenames, filename => regex.test(filename));
  output = map(output, filename => path.join(dirname, filename));
  output = map(output, filepath => require(filepath));
  return output;
}

function _notIndex(dirname) {
  const files = fs.readdirSync(dirname);
  return notIndex(dirname, files);
}

_notIndex.promise = dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) reject(err);
      else resolve(notIndex(dirname, files));
    });
  });
};

module.exports = _notIndex;
