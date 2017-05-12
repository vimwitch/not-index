'use strict';

const fs = require('fs');
const path = require('path');
const map = require('lodash.map');
const filter = require('lodash.filter');

function notIndex(filenames = [], fn = i => i) {
  const regex = /^(?!index)[a-z\-]+\.js$/;
  let output = filenames;
  output = filter(filenames, filename => regex.test(filename));
  output = map(output, filename => path.join(__dirname, filename));
  output = map(output, filepath => require(filepath));
  output = map(output, fn);
  return output;
}

function _notIndex(fn) {
  return notIndex(fs.readdirSync(__dirname), fn);
}

_notIndex.promise = fn => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, filenames) => {
      if (err) reject(err);
      else resolve(notIndex(filenames, fn));
    });
  });
};

module.exports = _notIndex;
