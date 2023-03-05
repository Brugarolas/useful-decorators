const throttleFn = require('lodash.throttle');

export function _throttle(milliseconds = 0, options = {}) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = throttleFn(originalMethod, milliseconds, options);
    return descriptor;
  };
}
