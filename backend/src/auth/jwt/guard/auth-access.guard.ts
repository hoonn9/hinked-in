import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessStrategy } from '../strategy/auth-access.strategy';

@Injectable()
export class JwtAccessGuard extends AuthGuard(
  JwtAccessStrategy.STRATEGY_NAME,
) {}
