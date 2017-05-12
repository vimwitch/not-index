# not-index
Require all `lowercase-file.js` files that are not `index.js` in `__dirname`

Example: the current directory contains the following files. Entries with a
trailing slash are directories.
```
directory/
file.js
file-with-dashes.js
file.with.js
file.with
index.js
```

The default file matching regex is `/^(?!index)[a-z\-]+\.js$/`

Synchronous
```
const requires = require('not-index')();

// requires is an array with filenames matches the following regex:
[
  require('./file.js'),
  require('./file-with-dashes.js'),
  require('./file.with.js')
]
```

Asynchronous
```
require('not-index')
  .then(requires => {
    // requies is the same as above but the asynchronous fs call is used for
    // reading the current directory
  });
```
