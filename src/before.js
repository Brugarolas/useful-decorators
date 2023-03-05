import {
  isFunction,
  isPromise
} from './utils/helpers.js';

export default function before (beforeFunction) {
  if (!isFunction(beforeFunction)) {
    throw new Error(`@before(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function (key, target, descriptor) {
    const originalFunction = descriptor.value;

    if (!isFunction(originalFunction)) {
      throw new Error(`@before(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function (...args) {
      const beforeFuncRes = beforeFunction();
      const res = originalFunction.apply(this, args);

      if (isPromise(beforeFuncRes)) {
        return beforeFuncRes.then(() => {
          return res;
        });
      }

      return res;
    };

    return descriptor;
  };
}
