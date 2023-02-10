import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Member } from '../../../member/entity/member.entity';
import { AuthFacebookValidateService } from '../../service/auth-facebook-validate.service';

@Injectable()
export class AuthFacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authFacebookValidateService: AuthFacebookValidateService,
  ) {
    super({
      clientID: configService.getOrThrow('FACEBOOK_APP_ID'),
      clientSecret: configService.getOrThrow('FACEBOOK_APP_SECRET'),
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<Member> {
    return this.authFacebookValidateService.validate(
      accessToken,
      refreshToken,
      profile,
    );
  }
}
