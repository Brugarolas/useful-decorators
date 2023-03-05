import {
  isFunction,
  isPromise
} from './utils/helpers.js';

export default function after (afterFunction) {
  if (!isFunction(afterFunction)) {
    throw new Error(`@after(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function (target, key, descriptor) {
    const originalFunction = descriptor.value;

    if (!isFunction(function_)) {
      throw new Error(`@after(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function (...args) {
      const result = originalFunction.apply(this, args);
      const afterFuncRes = afterFunction();

      if (isPromise(afterFuncRes)) {
        return afterFuncRes.then(() => {
          return result;
        });
      }

      return result;
    };

    return descriptor;
  };
}
