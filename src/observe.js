import onChangeFn from 'on-change';

export default function observe (observerCallback, options) {
  return function (target, key, descriptor) {
    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    const originalObject = descriptor.initializer();
    let observedObject = onChangeFn(originalObject, observerCallback, options);

    const { configurable } = descriptor;

    const newDescriptor = {
      configurable,

      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return observedObject;
        }

        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable,

          get () {
            return observedObject;
          },

          set (value) {
            observedObject = onChangeFn(value, observerCallback, options);
            delete this[key];
          }
        });
        definingProperty = false;

        return observedObject;
      },

      set (value) {
        observedObject = value;
        delete this[key];
      }
    };

    return newDescriptor;
  };
}
