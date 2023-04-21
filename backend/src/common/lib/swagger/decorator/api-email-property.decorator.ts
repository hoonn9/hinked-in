import { CustomApiPropertyOptions } from '../util/custom-api-property.interface';
import { CustomApiProperty } from '../util/custom-api-property';

export const ApiEmailProperty = (options?: CustomApiPropertyOptions) =>
  CustomApiProperty({
    name: 'email',
    type: String,
    example: 'example@email.com',
    ...options,
  });
