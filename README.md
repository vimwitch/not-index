# not-index
Require all `lowercase-filenames.js` that are not `index.js`

This package makes including directories easier by making `require('./dir')`
return an array of required files

Example `dir/index.js`
```js
// Synchronous
module.exports = require('not-index')(__dirname);

// Promised - using async fs call for reading the directory
// All require calls still block though
module.exports = require('not-index').promise(__dirname);

// Access subdirectory
// Arguments will be put into path.join
module.exports = require('not-index')(__dirname, 'subdir')
```

Example: the current directory contains the following files. Entries with a
trailing slash are directories.
```
my-dir/
  file.js
  file-with-dashes.js
  file.with.js
  file.with
  file.js.notjs
  index.js
  tmp/
  zzz/
```

The default file matching regex is `/^(?!index)[0-9a-z\-]+\.js$/`

Synchronous
```js
const requires = require('not-index')(__dirname);

// requires is an array with the following:
[
  require('./file.js'),
  require('./file-with-dashes.js'),
  require('./file.with.js')
]
```

Asynchronous
```js
require('not-index')
  .promise()
  .then(requires => {
    // requires is the same as above but the asynchronous fs call is used for
    // reading the current directory
  });
```

Example exporting classes by name on a single object
```js
const requires = require('not-index')(__dirname);

module.exports = requires.reduce((_classes, _class) => {
  return {
    ..._classes,
    [_class.name]: _class,
  }
}, {})
```
