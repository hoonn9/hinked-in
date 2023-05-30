import { CustomApiPropertyOptions } from '../util/custom-api-property.interface';
import { CustomApiProperty } from '../util/custom-api-property';

export const ApiUUIDProperty = (options?: CustomApiPropertyOptions) =>
  CustomApiProperty({
    type: String,
    example: 'b6f49b4e-aacd-4e93-8994-205dabf682e2',
    ...options,
  });
