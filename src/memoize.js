const memoizeFn = require('lodash.memoize');

export function _memoize() {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = memoizeFn(originalMethod);
    return descriptor;
  };
}
