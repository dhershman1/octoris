const fs = require('fs')
const parseUrl = require('parseurl')

function serveStatic (loc) {
  return function (ctx) {
    return new Promise((resolve, reject) => {
      let pathName = parseUrl(ctx.request).pathname
      const originalUrl = parseUrl.original(ctx.request)

      if (!pathName.startsWith(`/${loc}`)) {
        return resolve(ctx)
      }

      if (ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD') {
        ctx.response.setHeaders({ Allow: 'GET, HEAD', 'Content-Length': '0' })

        return ctx.response.end(405)
      }

      if (pathName === '/' && originalUrl.pathname.substr(-1) !== '/') {
        pathName = ''
      }

      return fs.readFile(pathName.replace('/', ''), (err, data) => {
        if (err) {
          return reject(err)
        }

        ctx.response.end(data)

        return resolve(ctx)
      })
    })
  }
}

module.exports = serveStatic
