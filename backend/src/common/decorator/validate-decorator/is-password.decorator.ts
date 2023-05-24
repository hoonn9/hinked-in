import { applyDecorators } from '@nestjs/common';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../util/regex';

export const IsPassword = () =>
  applyDecorators(
    IsString,
    Matches(passwordRegex, {
      message:
        '최소 8자이며 최소 1개의 문자, 1개의 숫자 및 1개의 특수 문자를 포함해야 합니다.',
    }),
  );
