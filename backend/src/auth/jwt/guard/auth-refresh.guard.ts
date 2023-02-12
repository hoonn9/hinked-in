import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshStrategy } from '../strategy/auth-refresh.strategy';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  JwtRefreshStrategy.STRATEGY_NAME,
) {}
