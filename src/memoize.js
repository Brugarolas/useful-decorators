const memoizeFn = require('lodash.memoize');

export default function memoize () {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = memoizeFn(originalMethod);
    return descriptor;
  };
}
