import { ApiPropertyOptions } from '@nestjs/swagger';

export interface CustomApiPropertyOptions extends ApiPropertyOptions {
  isOptional?: boolean;
}
