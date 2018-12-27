const fs = require('fs')
const path = require('path')
const globby = require('globby')
const debug = require('debug')('octo:scripts')

globby(['lib/**/*.js', '!lib/_internals']).then(d => {
  const __p = __dirname.replace('/scripts', '')
  debug('Path %s', __p)

  d.forEach(x => {
    debug(x)
    const parsedPath = path.parse(x)
    const name = parsedPath.name === 'index' && parsedPath.dir !== 'lib'
      ? parsedPath.dir.replace('lib/', '')
      : parsedPath.name

    debug('Parsed: %o', parsedPath)
    debug('Name %s', name)

    fs.copyFile(x, `./${name}.js`, err => {
      if (err) {
        throw err
      }

      debug('Copy Done')
    })
  })
})
