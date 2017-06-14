'use strict';

const fs = require('fs');
const path = require('path');
const map = require('lodash.map');
const filter = require('lodash.filter');
const reduce = require('lodash.reduce');

function notIndex(dirname, filenames = [], regex = /^(?!index)[a-z\-\.]+\.js$/) {
  let filepaths = filenames;
  filepaths = filter(filenames, filename => regex.test(filename));
  filepaths = map(filepaths, filename => path.join(dirname, filename));

  return reduce(filepaths, (acc, filepath) => {
    const components = filepath.replace('.js', '').split('/');
    const name = components[components.length - 1];
    acc[name] = require(filepath);
    return acc;
  }, {});
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
