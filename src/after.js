import { _isPromise, _isFunction } from './utils/index.js';

export default function _after(afterFunc) {
  if (_isFunction(afterFunc)) {
    throw new Error(`@after(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function afterTarget(target, key, descriptor) {
    const func = descriptor.value;

    if (_isFunction(func)) {
      throw new Error(`@after(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function descriptorValue(...args) {
      const res = func.apply(this, args);
      const afterFuncRes = afterFunc();
      if (_isPromise(afterFuncRes)) {
        return afterFuncRes.then(() => res);
      }

      return res;
    };

    return descriptor;
  };
};
