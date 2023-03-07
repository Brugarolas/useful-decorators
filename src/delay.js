import delayFn from 'lodash.delay';

export default function delay (milliseconds = 0) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = delayFn(originalMethod, milliseconds);
    return descriptor;
  };
}
