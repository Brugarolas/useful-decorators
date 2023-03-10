import { isFunction } from './utils/helpers.js';

export default function decorate (decoratorFunction) {
  if (!isFunction(decoratorFunction)) {
    throw new Error(`@decorate(fn) decorator can only be applied with methods, not: ${typeof decoratorFunction}`);
  }

  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = decoratorFunction(originalMethod);
    return descriptor;
  };
}
