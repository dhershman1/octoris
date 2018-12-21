const http = require('http')
const { toLower } = require('kyanite')

/**
 * This file is temporary and in place to simply keep track of http methods
 * To support and build out within octoris/methods
 */

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
