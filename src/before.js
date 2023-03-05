import { _isPromise, _isFunction } from './utils/index.js';

export default function _before (beforeFunc) {
  if (_isFunction(beforeFunc)) {
    throw new Error(`@before(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function (key, target, descriptor) {
    const func = descriptor.value;

    if (_isFunction(func)) {
      throw new Error(`@before(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function (...args) {
      const beforeFuncRes = beforeFunc();
      const res = func.apply(this, args);

      if (_isPromise(beforeFuncRes)) {
        return beforeFuncRes.then(() => res);
      }

      return res;
    };

    return descriptor;
  };
};
