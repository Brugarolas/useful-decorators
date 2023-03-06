import { isFunction } from './utils/helpers.js';

export default function autobind () {
  return function (target, key, descriptor) {
    let originalFn = descriptor.value;

    if (!isFunction(originalFn)) {
      throw new Error(`@autobind() decorator can only be applied to methods, not: ${typeof originalFn}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable: true,
      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof originalFn !== 'function') {
          return originalFn;
        }

        const boundFunction = originalFn.bind(this);

        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,

          get () {
            return boundFunction;
          },

          set (value) {
            originalFn = value;
            delete this[key];
          }
        });
        definingProperty = false;

        return boundFunction;
      },
      set (value) {
        originalFn = value;
      }
    };
  };
}
