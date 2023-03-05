const deferFn = require('lodash.defer');

export function _defer(milliseconds = 0, options = {}) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = deferFn(originalMethod, milliseconds, options);
    return descriptor;
  };
}
