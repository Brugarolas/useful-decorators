export default function mixin (parentClasses) {
  return function (childClass) {
    const childPropertyNames = new Set(Object.getOwnPropertyNames(childClass.prototype));

    for (const parentClass of parentClasses) {
      for (const name of Object.getOwnPropertyNames(parentClass.prototype)) {
        if (!childPropertyNames.has(name)) {
          childClass.prototype[name] = parentClass.prototype[name];
        }
      }
    }
  };
}
