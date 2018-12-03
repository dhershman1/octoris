const encodeUrl = require('encodeurl')
const Buffer = require('safe-buffer').Buffer

function json (code, data) {
  return function ({ response }) {
    response.writeHead(code, { 'Content-Type': 'application/json' })

    return response.end(data)
  }
}

function redirect (url, data) {
  return function ({ response, request }) {
    const address = encodeUrl(url)

    response.writeHead(302, { 'Content-Length': Buffer.byteLength(data), 'Location': address })

    if (request.method === 'HEAD') {
      return response.end()
    }

    return response.end(data)
  }
}

function send (code, data) {
  return function ({ response, request }) {
    response.writeHead(code, { 'Content-Type': 'text/html' })

    if (request.method === 'HEAD') {
      return response.end()
    }

    return response.end(data)
  }
}

module.exports = {
  json,
  redirect,
  send
}
