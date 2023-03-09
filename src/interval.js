export default function interval (milliseconds, continueFunc) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      const continueInterval = !continueFunc || continueFunc();

      if (continueInterval) {
        setInterval(() => {
          originalMethod.apply(this, args);
        }, milliseconds);
      }
    };

    return descriptor;
  };
}
