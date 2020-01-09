/**
 * A curry function that makes 3 param functions only require the first two params to be passed in
 * @private
 * @category Function
 * @param {Function} fn The function to curry
 * @return {Function} The curried function
 */
function _curryOpt (fn) {
  return function f3 (a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3
      case 1:
        return function (_b, _c) {
          return fn(a, _b, _c)
        }
      case 2:
        return fn(a, b)
      default:
        return fn(a, b, c)
    }
  }
}
module.exports = _curryOpt
