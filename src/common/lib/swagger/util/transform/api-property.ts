import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { ApiPropertyOptionsWithFieldName } from './type';
import { Type } from '@nestjs/common';
import { isClassRef } from '../../../../guard/is-class-ref';

export const wrapArrayElement = (
  property: ApiPropertyOptionsWithFieldName,
  element: any,
) => {
  if (property.isArray) {
    return [element];
  }
  return element;
};

export const getPrimitiveExample = (
  optionType: ApiPropertyOptionsWithFieldName['type'],
) => {
  if (
    optionType === 'string' ||
    optionType === 'number' ||
    optionType === 'boolean'
  ) {
    return optionType;
  }

  if (optionType === String) {
    return 'string';
  }

  if (optionType === Number) {
    return 'number';
  }

  if (optionType === Boolean) {
    return 'boolean';
  }

  return undefined;
};

export const getExampleDefaultDescription = (
  property: ApiPropertyOptionsWithFieldName,
) => {
  if (typeof property.example !== 'undefined') {
    return property.example;
  }

  return property.description || getPrimitiveExample(property.type);
};

export const getApiPropertyKeys = (classRef: Type): string[] => {
  if (!isClassRef(classRef)) {
    return [];
  }

  return (
    Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES_ARRAY,
      classRef.prototype,
    ) || []
  );
};

export const getApiPropertyOptions = (
  classRef: Type,
  propertyKeys: string[],
): ApiPropertyOptionsWithFieldName[] => {
  return propertyKeys.map((key) => {
    const fieldName = key.substring(1);

    const metadata = Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES,
      classRef.prototype,
      fieldName,
    );

    metadata.fieldName = fieldName;
    return metadata;
  });
};
