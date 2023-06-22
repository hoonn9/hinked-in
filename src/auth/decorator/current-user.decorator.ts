import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../type/auth-request.type';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();

    return request.user || null;
  },
);
