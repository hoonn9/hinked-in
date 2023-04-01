import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../type/auth-jwt.type';
import { AuthJwtValidateService } from '../service/auth-jwt-validate.service';
import { MemberEntity } from '../../../member/entity/member.entity';

const strategyName = 'AUTH_ACCESS';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  strategyName,
) {
  static readonly STRATEGY_NAME = strategyName;
  constructor(
    private readonly authJwtValidateService: AuthJwtValidateService,
    private readonly configService: ConfigService,
  ) {
    const name = configService.getOrThrow('JWT_ACCESS_TOKEN_NAME');
    const secret = configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.cookies?.[name];
        },
      ]),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<MemberEntity> {
    return this.authJwtValidateService.validate(payload);
  }
}
