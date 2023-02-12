import { Injectable } from '@nestjs/common';
import { AuthFederateService } from './auth-federate.service';
import { Member } from '../../member/entity/member.entity';
import { Profile } from 'passport-google-oauth20';
import { AuthFederateEnum } from '../enum/auth-federate.enum';
import { AuthFederateValidateService } from './auth-federate-validate.abstract';

@Injectable()
export class AuthGoogleValidateService extends AuthFederateValidateService {
  constructor(private readonly authFederateService: AuthFederateService) {
    super();
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<Member> {
    return this.authFederateService.validate(AuthFederateEnum.GOOGLE, {
      profileId: profile.id,
      email: this.getEmailByProfile(profile),
    });
  }
}
