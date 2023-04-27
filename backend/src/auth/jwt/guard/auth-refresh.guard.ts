import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../strategy/auth-refresh.strategy';
import { LoginNeedException } from '../../exception/login-need.exception';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  JwtRefreshStrategy.STRATEGY_NAME,
) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest<MemberEntity>(_: any, user: MemberEntity | false) {
    if (!user) {
      throw new LoginNeedException();
    }

    return user;
  }
}
