const fs = require('fs')
const encodeUrl = require('encodeurl')
const Buffer = require('safe-buffer').Buffer
const { and, type } = require('kyanite')

const _curry2 = require('../_internals/_curry2')

/**
 * Is used to handle json based responses
 * @function
 * @public
 * @param {Number|String} code The status code to set for the response
 * @param {Any} data A simple data type string to send back to the user
 */
function json (code, data) {
  const codeType = type(code)

  if (and(codeType !== 'Number', codeType !== 'String')) {
    throw new TypeError('Code must be provided and it must be a string or number')
  }

  return function ({ response }) {
    response.writeHead(code, { 'Content-Type': 'application/json' })

    return response.end(data)
  }
}

/**
 * Handles redirect routes
 * @function
 * @public
 * @param {String} url The url path to redirect the user too
 * @param {String|Number|Boolean} data Information to provide to the user
 */
function redirect (url, data) {
  return function ({ response, request }) {
    const address = encodeUrl(url)

    response.writeHead(302, { 'Content-Length': Buffer.byteLength(data), Location: address })

    if (request.method === 'HEAD') {
      return response.end()
    }

    return response.end(data)
  }
}

/**
 * Handles basic response types
 * @public
 * @function
 * @param {Number|String} code The status code to set for the response
 * @param {Number|String|Boolean} data A simple data type string to send back to the user
 */
function send (code, data) {
  const codeType = type(code)
  console.log(data)

  if (and(codeType !== 'Number', codeType !== 'String')) {
    throw new TypeError('Code must be provided and it must be a string or number')
  }

  return function ({ node, response }) {
    node.response.writeHead(code, Object.assign({}, response.headers, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    }))

    if (node.request.method === 'HEAD') {
      return node.response.end()
    }

    return node.response.end(data)
  }
}

function render (htmlPath) {
  return function ({ response, logger }) {
    return fs.readFile(htmlPath, (err, data) => {
      if (err) {
        logger.error(err)

        response.writeHead(500, { 'Content-Type': 'text/html' })

        return response.end('Something went wrong!')
      }

      response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length })

      return response.end(data)
    })
  }
}

module.exports = {
  json: _curry2(json),
  redirect: _curry2(redirect),
  send: _curry2(send),
  render
}
