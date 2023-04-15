import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

type LazyTypeFunc = () => Type;

function isLazyTypeFunc(
  type: LazyTypeFunc | Type<unknown>,
): type is { type: LazyTypeFunc } & LazyTypeFunc {
  return (
    type != null &&
    (typeof type == 'object' || typeof type == 'function') &&
    type.name == 'type'
  );
}

const isPrimitive = (optionType: ApiPropertyOptions['type']) => {
  return ['string', 'number', 'undefined', String, Boolean, Number].some(
    (type) => optionType === type,
  );
};

type ApiPropertyOptionsWithFieldName = ApiPropertyOptions & {
  fieldName: string;
};

export const transformDTOToExample = <T>(
  dtoClass: Type<T>,
  generic?: Type<T>,
): T => {
  const result: Record<string, any> = {};

  if (typeof dtoClass !== 'function') {
    return result as T;
  }

  const propertiesArray: string[] =
    Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES_ARRAY,
      dtoClass.prototype,
    ) || [];

  const properties: ApiPropertyOptionsWithFieldName[] = propertiesArray.map(
    (field) => {
      const fieldName = field.substring(1);

      const obj = Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        dtoClass.prototype,
        fieldName,
      );
      obj.fieldName = fieldName;
      return obj;
    },
  );

  for (const property of properties) {
    const propertyType = property.type;

    if (propertyType) {
      if (propertyType === 'generic') {
        if (generic) {
          if (property.isArray) {
            result[property.fieldName] = [transformDTOToExample(generic)];
          } else {
            result[property.fieldName] = transformDTOToExample(generic);
          }
        }
      } else if (isPrimitive(propertyType)) {
        if (typeof property.example !== 'undefined') {
          result[property.fieldName] = property.example;
        } else {
          result[property.fieldName] = property.description;
        }
      } else if (isLazyTypeFunc(propertyType as LazyTypeFunc | Type<unknown>)) {
        const constructorType = (propertyType as LazyTypeFunc)();

        if (Array.isArray(constructorType)) {
          result[property.fieldName] = [
            transformDTOToExample(constructorType[0]),
          ];
        } else if (property.isArray) {
          result[property.fieldName] = [transformDTOToExample(constructorType)];
        } else {
          result[property.fieldName] = transformDTOToExample(constructorType);
        }
      } else {
        if (property.isArray) {
          result[property.fieldName] = [
            transformDTOToExample(propertyType as Type),
          ];
        } else {
          result[property.fieldName] = transformDTOToExample(
            propertyType as Type,
          );
        }
      }
    }
  }
  return result as T;
};
