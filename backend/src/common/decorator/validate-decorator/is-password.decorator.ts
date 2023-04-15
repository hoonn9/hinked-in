import { applyDecorators } from '@nestjs/common';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../util/regex';

export const IsPassword = () =>
  applyDecorators(
    IsString,
    Matches(passwordRegex, {
      message:
        '비밀번호는 최소 8자이상으로 숫자, 특문 1자 이상, 영문은 2자 이상 사용해야 합니다.',
    }),
  );
