import { SetMetadata, Type } from '@nestjs/common';

export const CUSTOM_REPOSITORY = Symbol('CUSTOM_REPOSITORY');

export const CustomRepository = (entity: Type) => {
  return SetMetadata(CUSTOM_REPOSITORY, entity);
};
