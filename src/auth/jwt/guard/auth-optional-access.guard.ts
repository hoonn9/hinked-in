import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessStrategy } from '../strategy/auth-access.strategy';

@Injectable()
export class JwtOptionalAccessGuard extends AuthGuard(
  JwtAccessStrategy.STRATEGY_NAME,
) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest<MemberEntity>(
    _: any,
    user: MemberEntity | false,
  ): MemberEntity | null {
    return user || null;
  }
}
