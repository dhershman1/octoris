
function GET (handler) {
  return new Map([['GET', handler]])
}

function POST (handler) {
  return new Map([['POST', handler]])
}

module.exports = {
  GET,
  POST
}
