const encodeUrl = require('encodeurl')
const Buffer = require('safe-buffer').Buffer

function json (code, data) {
  return function ({ res }) {
    res.writeHead(code, { 'Content-Type': 'application/json' })

    return res.end(data)
  }
}

function redirect (url, data) {
  return function ({ res, req }) {
    const address = encodeUrl(url)

    res.writeHead(302, { 'Content-Length': Buffer.byteLength(data), 'Location': address })

    if (req.method === 'HEAD') {
      return res.end()
    }

    return res.end(data)
  }
}

function send (code, data) {
  return function ({ res, req }) {
    res.writeHead(code, { 'Content-Type': 'text/html' })

    if (req.method === 'HEAD') {
      return res.end()
    }

    return res.end(data)
  }
}

module.exports = {
  json,
  redirect,
  send
}
