import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from '../type/auth-request.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();

    if (request.user == null) {
      throw new UnauthorizedException();
    }

    return request.user;
  },
);
