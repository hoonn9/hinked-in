import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const TransformToArray = () =>
  applyDecorators(
    Transform(({ value }) => {
      if (Array.isArray(value)) {
        return value;
      }
      return [value];
    }),
  );
