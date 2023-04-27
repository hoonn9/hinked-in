import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../strategy/auth-refresh.strategy';
import { AuthRequest } from '../../type/auth-request.type';
import { LoginNeedException } from '../../exception/login-need.exception';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  JwtRefreshStrategy.STRATEGY_NAME,
) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: AuthRequest = context.switchToHttp().getRequest();
    this.validate(req);

    return super.canActivate(context) as boolean;
  }

  private validate(req: AuthRequest) {
    if (!req.user) {
      throw new LoginNeedException();
    }
  }
}
