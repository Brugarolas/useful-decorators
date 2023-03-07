import { mapInjects } from './utils/injects.js';

export default function provide (name) {
  return function (target, key, descriptor) {
    const instance = descriptor.value || descriptor.initializer();
    const instanceName = name || key;

    mapInjects.set(instanceName, instance);

    return descriptor;
  };
}
