import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiDateProperty = (options?: ApiPropertyOptions) =>
  applyDecorators(
    ApiProperty({
      type: String,
      example: '2023-04-09T14:40:49.107Z',
      ...options,
    }),
  );
