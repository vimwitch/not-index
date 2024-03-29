const fs = require('fs')
const path = require('path')

function notIndex(dirname, filenames = [], regex = /^(?!index)[0-9a-z\-\.]+\.(js|ts)$/) {
  return filenames
    .filter(filename => regex.test(filename))
    .map(filename => path.join(dirname, filename))
    .map(filepath => require(filepath))
}

function _notIndex(pathParts, regex) {
  const dirname = path.join(...[pathParts].flat())
  const files = fs.readdirSync(dirname)
  return notIndex(dirname, files, regex)
}

_notIndex.promise = dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) reject(err)
      else resolve(notIndex(dirname, files))
    })
  })
}

module.exports = _notIndex
