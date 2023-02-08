import { AuthGuard } from '@nestjs/passport';
import { AuthLocalStrategy } from '../strategy/auth-local.strategy';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthLocalBodyDto } from '../dto/auth-local.dto';
import { ensureValidation } from '../../common/lib/validation';

export class AuthLocalGuard extends AuthGuard(AuthLocalStrategy.STRATEGY_NAME) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    await ensureValidation(AuthLocalBodyDto, req.body);

    return super.canActivate(context) as boolean;
  }
}
