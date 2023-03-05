const delayFn = require('lodash.delay');

export function _delay(milliseconds = 0, options = {}) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = delayFn(originalMethod, milliseconds, options);
    return descriptor;
  };
}
