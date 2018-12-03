const _appendǃ = require('./_appendǃ')

const state = {
  dynamicRoutes: []
}

function updateRoutes (route) {
  return _appendǃ(state.dynamicRoutes, route)
}

module.exports = {
  state,
  updateRoutes
}
