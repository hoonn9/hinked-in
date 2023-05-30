import { applyDecorators } from '@nestjs/common';
import { IsUUID } from 'class-validator';

export const IsID = () => applyDecorators(IsUUID('4'));
