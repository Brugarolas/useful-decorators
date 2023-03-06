export default function immutable () {
  return function(target, key, descriptor) {
    const originalObject = descriptor.initializer();
    Object.freeze(originalObject);

    return {
      configurable: true,

      get () {
        return originalObject;
      }
    };
  };
}
