import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthLocalValidateService } from '../service/auth-local-validate.service';
import { Member } from '../../member/entity/member.entity';

const strategyName = 'LOCAL';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  LocalStrategy,
  strategyName,
) {
  static readonly STRATEGY_NAME = strategyName;

  constructor(
    private readonly authLocalValidateService: AuthLocalValidateService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<Member> {
    return this.authLocalValidateService.validateMember(username, password);
  }
}
