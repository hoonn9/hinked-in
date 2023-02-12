import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Member } from '../../member/entity/member.entity';

const strategyName = 'LOCAL';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  LocalStrategy,
  strategyName,
) {
  static readonly STRATEGY_NAME = strategyName;

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<Member> {
    return this.authService.validateMember(username, password);
  }
}
