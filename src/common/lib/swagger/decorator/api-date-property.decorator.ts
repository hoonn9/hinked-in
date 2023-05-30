import { CustomApiPropertyOptions } from '../util/custom-api-property.interface';
import { CustomApiProperty } from '../util/custom-api-property';

export const ApiDateProperty = (options?: CustomApiPropertyOptions) =>
  CustomApiProperty({
    type: String,
    example: '2023-04-09T14:40:49.107Z',
    ...options,
  });
