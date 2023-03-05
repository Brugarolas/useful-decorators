export const isFunction = function (function_) {
  return typeof function_ === 'function';
};

export const _isPromise = function (property) {
  return property !== null && (typeof property === 'object' || typeof property === 'function') && typeof property.then === 'function';
};

export default {
  isFunction,
  _isPromise
};
