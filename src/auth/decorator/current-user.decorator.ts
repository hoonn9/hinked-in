import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from '../type/auth-request.type';

interface CurrentUserOption {
  isOptional?: boolean;
}

export const CurrentUser = (options?: CurrentUserOption) =>
  createParamDecorator(
    (options: CurrentUserOption | undefined, ctx: ExecutionContext) => {
      const request: AuthRequest = ctx.switchToHttp().getRequest();

      if (options?.isOptional) {
        return request.user || null;
      }

      if (request.user == null) {
        throw new UnauthorizedException();
      }

      return request.user;
    },
  )(options);
