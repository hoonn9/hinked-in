import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Injectable, UseFilters } from '@nestjs/common';
import { AuthLocalValidateService } from '../service/auth-local-validate.service';
import { MemberEntity } from '../../../member/entity/member.entity';
import { HttpExceptionFilter } from '../../../common/exception/exception-filter/http-exception-filter';

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

  @UseFilters(HttpExceptionFilter)
  async validate(username: string, password: string): Promise<MemberEntity> {
    return this.authLocalValidateService.validateMember(username, password);
  }
}
