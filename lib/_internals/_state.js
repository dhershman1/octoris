const _assocǃ = require('./_appendǃ')

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
