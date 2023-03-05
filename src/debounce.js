const debounceFn = require('lodash.debounce');

export function _debounce(milliseconds = 0, options = {}) {
  return function(target, key, descriptor) {
    const map = new WeakMap();
    const originalMethod = descriptor.value;

    descriptor.value = function(...params) {
      let debounced = map.get(this);

      if (!debounced) {
        debounced = debounceFn(originalMethod, milliseconds, options).bind(this);
        map.set(this, debounced);
      }

      debounced(...params);
    };

    return descriptor;
  };
}
