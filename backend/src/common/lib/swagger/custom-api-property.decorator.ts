import { CustomApiPropertyOptions } from './custom-api-property.interface';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const CustomApiProperty = (options?: CustomApiPropertyOptions) => {
  if (options?.isOptional !== undefined) {
    const { isOptional, ...apiPropertyOptions } = options;

    return applyDecorators(
      options.isOptional
        ? ApiPropertyOptional(apiPropertyOptions)
        : ApiProperty(apiPropertyOptions),
    );
  }

  return applyDecorators(ApiProperty(options));
};
