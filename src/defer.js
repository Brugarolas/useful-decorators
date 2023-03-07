import deferFn from 'lodash.defer';

export default function defer () {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = deferFn(originalMethod);
    return descriptor;
  };
}
