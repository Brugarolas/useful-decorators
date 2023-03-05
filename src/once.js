const onceFn = require('lodash.once');

export default function once () {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = onceFn(originalMethod);
    return descriptor;
  };
}
