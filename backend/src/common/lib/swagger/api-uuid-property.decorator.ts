import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiUUIDProperty = (options?: ApiPropertyOptions) =>
  applyDecorators(
    ApiProperty({
      type: String,
      example: 'b6f49b4e-aacd-4e93-8994-205dabf682e2',
      ...options,
    }),
  );
