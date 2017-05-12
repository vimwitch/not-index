'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function notIndex(filenames = [], regex = /^(?!index)[a-z\-]+\.js$/) {
  return _.chain(filenames)
    .filter(filename => regex.test(filename))
    .map(filename => path.join(__dirname, filename))
    .map(filepath => require(filepath))
    .value();
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
