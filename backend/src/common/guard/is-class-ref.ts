export const isClassRef = (object: any): boolean => {
  if (typeof object !== 'function') {
    return false;
  }

  const classPrototype = Object.getPrototypeOf(object.prototype);

  if (!classPrototype || classPrototype.constructor !== Object) {
    return false;
  }

  return !!object.toString()?.startsWith('class ');
};
