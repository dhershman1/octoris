function useEffect (fn) {
  return req => fn(req)
}

function pipe (route, middleware) {

}

module.exports = {
  useEffect
}
