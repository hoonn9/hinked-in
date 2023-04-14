import { applyDecorators } from '@nestjs/common';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../util/regex';

export const IsPassword = () =>
  applyDecorators(IsString, Matches(passwordRegex));
