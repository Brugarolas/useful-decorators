const debounceFn = require('lodash.debounce');

export default function debounce (milliseconds = 0, options = {}) {
  return function (target, key, descriptor) {
    const map = new WeakMap();
    const originalMethod = descriptor.value;

    descriptor.value = function (...parameters) {
      let debounced = map.get(this);

      if (!debounced) {
        debounced = debounceFn(originalMethod, milliseconds, options).bind(this);
        map.set(this, debounced);
      }

      debounced(...parameters);
    };

    return descriptor;
  };
}
