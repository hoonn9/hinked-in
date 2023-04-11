import { ApiPropertyOptions } from '@nestjs/swagger';
import { CustomApiProperty } from './custom-api-property.decorator';

export const ApiPasswordProperty = (options?: ApiPropertyOptions) =>
  CustomApiProperty({
    name: 'password',
    description:
      '최소 8자이며 최소 1개의 문자, 1개의 숫자 및 1개의 특수 문자를 포함해야 합니다.',
    example: 'qwer!1234',
    ...options,
  });
