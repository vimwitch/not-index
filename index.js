'use strict';

const fs = require('fs');
const path = require('path');
const map = require('lodash.map');
const filter = require('lodash.filter');

function notIndex(filenames = [], regex = /^(?!index)[a-z\-]+\.js$/) {
  let output = filenames;
  output = filter(filenames, filename => regex.test(filename));
  output = map(output, filename => path.join(__dirname, filename));
  output = map(output, filepath => require(filepath));
  return output;
}

function _notIndex(regex) {
  return notIndex(fs.readdirSync(__dirname), regex);
}

_notIndex.promise = (regex) => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, filenames) => {
      if (err) reject(err);
      else resolve(notIndex(filenames, regex));
    });
  });
};

module.exports = _notIndex;
