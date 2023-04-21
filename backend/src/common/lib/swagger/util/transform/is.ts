import { Type } from '@nestjs/common';
import { LazyTypeFunc } from './type';
import { ApiPropertyOptions } from '@nestjs/swagger';

export const isLazyTypeFuncApiPropertyType = (
  type: LazyTypeFunc | Type<unknown>,
): type is { type: LazyTypeFunc } & LazyTypeFunc => {
  return (
    type != null &&
    (typeof type == 'object' || typeof type == 'function') &&
    type.name == 'type'
  );
};

export const isPrimitiveApiPropertyType = (
  optionType: ApiPropertyOptions['type'],
) => {
  return ['string', 'number', 'undefined', String, Boolean, Number].some(
    (type) => optionType === type,
  );
};
