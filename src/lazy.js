export default function lazy () {
  return function (target, key, descriptor) {
    const { configurable, enumerable, initializer, value } = descriptor;

    return {
      configurable,
      enumerable,

      get () {
        // This happens if someone accesses the property directly on the prototype
        if (this === target) {
          return undefined;
        }

        let lazyValue = initializer ? initializer.call(this) : value;

        Object.defineProperty(this, key, {
          configurable,
          enumerable,

          get () {
            return lazyValue;
          },

          set (newValue) {
            delete this[key];
            lazyValue = newValue;
          }
        });

        return lazyValue;
      },

      set (newValue) {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: true,
          value: newValue,
          writable: true
        });

        return newValue;
      }
    };
  };
}
