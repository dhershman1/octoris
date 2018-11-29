const http = require('http')
const { toLower } = require('kyanite')

function getCurrentMethods () {
  return http.METHODS && http.METHODS.map(toLower)
}

function getBasicMethods () {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ]
}

module.exports = getCurrentMethods() || getBasicMethods()
