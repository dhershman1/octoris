const { exec } = require('child_process')
const path = require('path')
const chokidar = require('chokidar')
const fs = require('fs/promises')

const watcher = chokidar.watch(['tests/*.js', 'lib/**/*.js'], { ignoreInitial: true })

function print (err, stdout) {
  if (err) {
    console.error('Error in watcher', err)
  } else {
    console.log(stdout)
  }
}

// Run the tests initially:
exec('FORCE_COLOR=1 npm t', print)

// Turn on the watcher to listen for changes in the app
watcher.on('all', (_, loc) => {
  const { dir, name } = path.parse(loc)
  let filePath = loc

  // The test wasn't changed directly so go find it
  if (!dir.includes('tests')) {
    const [, locName = name] = dir.split('/')
    const fileName = name === 'index' ? locName : name

    filePath = path.join('tests', `${fileName}.js`)
  }

  fs.stat(filePath)
    .then(() => exec(`FORCE_COLOR=1 npx -c "tape ${filePath} | tap-on -s"`, print))
    .catch(() => {
      console.log('No test file found.')
      console.log(loc)
      console.log(filePath)
    })

})
