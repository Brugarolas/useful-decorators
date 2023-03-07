import { isFunction } from './utils/helpers.js';
import { mapInjects } from './utils/injects.js';
import onChangeFn from 'on-change';

export default function watch (parent, childKey, options) {
  return function (target, key, descriptor) {
    const onChange = descriptor.value;

    if (!isFunction(onChange)) {
      throw new Error(`@watch() decorator can only be applied to methods, not: ${typeof originalFn}`);
    }

    const parentObject = typeof parent === 'string' ? mapInjects.get(parent) : parent;

    if (!parentObject) {
      return descriptor;
    }

    let observedObject = onChangeFn(parentObject[childKey], onChange, options);

    Object.defineProperty(parentObject, childKey, {
      configurable: true,

      get () {
        return observedObject;
      },

      set (value) {
        delete this[key];
        onChange();
        observedObject = onChangeFn(value, onChange, options);
      }
    });

    return descriptor;
  };
}
