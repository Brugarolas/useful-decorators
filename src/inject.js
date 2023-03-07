import { mapInjects } from './utils/injects.js';

export default function inject (name) {
  return function (target, key, descriptor) {
    let injectedObject = mapInjects.get(name || key);

    const { configurable } = descriptor;

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable,

      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return injectedObject;
        }

        injectedObject = mapInjects.get(name || key);

        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,

          get () {
            return injectedObject;
          },

          set (value) {
            injectedObject = value;
            delete this[key];
          }
        });
        definingProperty = false;

        return injectedObject;
      },

      set (value) {
        injectedObject = value;
      }
    };
  };
}
