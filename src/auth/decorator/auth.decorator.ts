import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '../jwt/guard/auth-access.guard';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';
import { Role } from '../type/role.type';
import { JwtOptionalAccessGuard } from '../jwt/guard/auth-optional-access.guard';

const roleDecoratorMap: Record<
  Role,
  (ClassDecorator | MethodDecorator | PropertyDecorator)[]
> = {
  USER: [UseGuards(JwtOptionalAccessGuard)],
  MEMBER: [
    UseGuards(JwtAccessGuard),
    ApiHttpExceptionResponse(HttpStatus.UNAUTHORIZED, [
      {
        title: '멤버 인증 정보가 존재하지 않을 경우',
        description:
          '인증 정보가 존재하지 않거나 올바르지 않을 때의 응답입니다.',
        response: EXCEPTION_RESPONSE.LoginNeed,
      },
    ]),
  ],
};

export const Auth = (role: Role = 'MEMBER') =>
  applyDecorators(...roleDecoratorMap[role]);
