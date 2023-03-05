import deferFn from 'lodash.defer';

export default function defer (milliseconds = 0, options = {}) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = deferFn(originalMethod, milliseconds, options);
    return descriptor;
  };
}
