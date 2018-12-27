const fs = require('fs')
const path = require('path')
const globby = require('globby')
const logger = require('pino')({
  name: 'octo:scripts',
  timestamp: false,
  base: {
    pid: null,
    hostname: null
  }
})

globby(['lib/**/*.js', '!lib/_internals']).then(d => {
  const __p = __dirname.replace('/scripts', '')
  logger.info('Path %s', __p)

  d.forEach(x => {
    const parsedPath = path.parse(x)
    const name = parsedPath.name === 'index' && parsedPath.dir !== 'lib'
      ? parsedPath.dir.replace('lib/', '')
      : parsedPath.name

    fs.copyFile(x, `./${name}.js`, err => {
      if (err) {
        throw err
      }

      logger.info('Copied %s', name)
    })
  })
})
