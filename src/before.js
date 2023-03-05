import {
  isFunction,
  isPromise
} from './utils/index.js';

export default function before (beforeFunction) {
  if (!isFunction(beforeFunction)) {
    throw new Error(`@before(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function (key, target, descriptor) {
    const function_ = descriptor.value;

    if (!isFunction(function_)) {
      throw new Error(`@before(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function (...args) {
      const beforeFuncRes = beforeFunction();
      const res = function_.apply(this, args);

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
