import { mapInjects } from './utils/injects.js';

export default function singleton (name) {
  return function (target, key, descriptor) {
    const instance = new target();
    const instanceName = name || target.name.charAt(0).toLowerCase() + target.name.slice(1);

    mapInjects.set(instanceName, instance);

    return descriptor;
  };
}
