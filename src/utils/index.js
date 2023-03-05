export const _isFunction = function (fn) {
  return typeof fn !== 'function';
}

export const _isPromise = function (prop) {
  return prop !== null && (typeof prop === 'object' || typeof prop === 'function') && typeof prop.then === 'function';
};

export default { _isFunction, _isPromise };
