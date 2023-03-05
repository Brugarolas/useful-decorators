import onChangeFn from 'on-change';

export default function observe (fn, options) {
  return function (target, key, descriptor) {
    const originalProperty = descriptor.value;
    descriptor.value = onChangeFn(originalProperty, fn, options);
    return descriptor;
  };
}
