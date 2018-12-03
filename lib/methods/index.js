/**
 * Example of how these will be used for reference
 *
 * route('/home', [GET(handler)])
 */

// These guys will need to be composeable to make a single usable function
// Currently these are placeholders until that idea comes to be
// Maybe this will return a wrapper version of the function?
function GET (handler) {
  return function get () {
    return handler
  }
}

function POST (handler) {
  return function post () {
    return handler
  }
}

module.exports = {
  GET,
  POST
}
