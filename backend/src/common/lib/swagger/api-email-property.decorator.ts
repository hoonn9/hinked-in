import { CustomApiPropertyOptions } from './custom-api-property.interface';
import { CustomApiProperty } from './custom-api-property.decorator';

export const ApiEmailProperty = (options?: CustomApiPropertyOptions) =>
  CustomApiProperty({
    name: 'email',
    type: String,
    example: 'example@email.com',
    ...options,
  });
