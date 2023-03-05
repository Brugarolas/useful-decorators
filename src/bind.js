import { isFunction } from './utils';

export default function bind (context) {
  return function (target, key, descriptor) {
    let function_ = descriptor.value;

    if (!isFunction(function_)) {
      throw new Error(`@bind decorator() can only be applied to methods, not: ${typeof function_}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable: true,
      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof function_ !== 'function') {
          return function_;
        }

        const boundFunction = function_.bind(context);
        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,
          get () {
            return boundFunction;
          },
          set (value) {
            function_ = value;
            delete this[key];
          }
        });
        definingProperty = false;
        return boundFunction;
      },
      set (value) {
        function_ = value;
      }
    };
  };
}
