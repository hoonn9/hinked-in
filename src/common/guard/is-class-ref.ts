import { Type } from '@nestjs/common';

export const isClassRef = (object: any): object is Type => {
  if (typeof object !== 'function') {
    return false;
  }

  const classPrototype = Object.getPrototypeOf(object.prototype);

  if (!classPrototype || typeof classPrototype.constructor !== 'function') {
    return false;
  }

  return !!object.toString()?.startsWith('class ');
};
