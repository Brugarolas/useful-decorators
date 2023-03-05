import {
  isFunction,
  _isPromise
} from './utils';

export default function after (afterFunction) {
  if (!isFunction(afterFunction)) {
    throw new Error(`@after(fn) decorator can only be applied with methods, not: ${typeof fn}`);
  }

  return function afterTarget (target, key, descriptor) {
    const function_ = descriptor.value;

    if (!isFunction(function_)) {
      throw new Error(`@after(fn) decorator can only be applied to methods, not: ${typeof fn}`);
    }

    descriptor.value = function descriptorValue (...args) {
      const res = function_.apply(this, args);
      const afterFuncRes = afterFunction();
      if (_isPromise(afterFuncRes)) {
        return afterFuncRes.then(() => {
          return res;
        });
      }

      return res;
    };

    return descriptor;
  };
}
