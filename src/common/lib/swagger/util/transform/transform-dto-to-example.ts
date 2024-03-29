import { Type } from '@nestjs/common';
import { ApiPropertyOptionsWithFieldName, LazyTypeFunc } from './type';
import {
  getApiPropertyKeys,
  getApiPropertyOptions,
  getExampleDefaultDescription,
  wrapArrayElement,
} from './api-property';
import {
  isLazyTypeFuncApiPropertyType,
  isPrimitiveApiPropertyType,
} from './is';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { isClassRef } from '../../../../guard/is-class-ref';

export const getExampleByType = (
  type: ApiPropertyOptions['type'] | boolean,
): any => {
  if (Array.isArray(type)) {
    const [arrayType] = type;

    if (isClassRef(arrayType)) {
      return [getExampleByType(arrayType)];
    }

    if (typeof arrayType === 'function') {
      return [getExampleByType(arrayType())];
    }
    return [getExampleByType(arrayType)];
  }

  if (isClassRef(type)) {
    return transformDTOToExample(type);
  }

  if (typeof type === 'function') {
    return getExampleByType(type());
  }

  return type;
};

export const transformDTOToExample = <T>(
  classRef: Type<T>,
  generic?: Type<T>,
): T => {
  const properties = getApiPropertyOptions(
    classRef,
    getApiPropertyKeys(classRef),
  );

  const result: Record<string, any> = {};

  for (const property of properties) {
    result[property.fieldName] = getFieldExample(property, generic);
  }

  return result as T;
};

const getFieldExample = <T>(
  property: ApiPropertyOptionsWithFieldName,
  generic?: Type<T>,
) => {
  const propertyType = property.type;

  if (propertyType == null) {
    return;
  }

  if (propertyType === 'generic' && generic) {
    return wrapArrayElement(property, transformDTOToExample(generic));
  }

  if (isPrimitiveApiPropertyType(propertyType)) {
    return getExampleDefaultDescription(property);
  }

  if (
    isLazyTypeFuncApiPropertyType(propertyType as LazyTypeFunc | Type<unknown>)
  ) {
    const constructorType = (propertyType as LazyTypeFunc)();

    if (Array.isArray(constructorType)) {
      return [transformDTOToExample(constructorType[0])];
    }

    return wrapArrayElement(property, transformDTOToExample(constructorType));
  }

  return wrapArrayElement(
    property,
    transformDTOToExample(propertyType as Type),
  );
};
