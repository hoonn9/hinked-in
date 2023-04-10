import { CustomApiPropertyOptions } from './custom-api-property.interface';
import { CustomApiProperty } from './custom-api-property.decorator';

export const ApiUUIDProperty = (options?: CustomApiPropertyOptions) =>
  CustomApiProperty({
    type: String,
    example: 'b6f49b4e-aacd-4e93-8994-205dabf682e2',
    ...options,
  });
