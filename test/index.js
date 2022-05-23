const notIndex = require('..')

function test(requires = [], expectedCount = 3) {
  if (requires.length !== expectedCount) throw new Error('Invalid count')
}

;(async () => {
  test(notIndex(__dirname))

  await notIndex
    .promise(__dirname)
    .then(test)

  test(notIndex([__dirname, 'subdir']), 2)
  test(notIndex([__dirname, 'subdir'], /[a-z0-9]\.js/), 3)

  console.log('Everything seems to have worked')
})()
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
