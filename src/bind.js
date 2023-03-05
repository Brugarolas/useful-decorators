import { _isFunction } from './utils/index.js';

export default function _bind (context) {
  return function (target, key, descriptor) {
    let fn = descriptor.value;

    if (_isFunction(fn)) {
      throw new Error(`@bind decorator() can only be applied to methods, not: ${typeof fn}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
          return fn;
        }

        let boundFn = fn.bind(context);
        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,
          get() {
            return boundFn;
          },
          set(value) {
            fn = value;
            delete this[key];
          }
        });
        definingProperty = false;
        return boundFn;
      },
      set(value) {
        fn = value;
      }
    };
  }
}
