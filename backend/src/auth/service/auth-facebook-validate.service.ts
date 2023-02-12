import { Injectable } from '@nestjs/common';
import { AuthFederateService } from './auth-federate.service';
import { Profile } from 'passport-facebook';
import { AuthFederateEnum } from '../enum/auth-federate.enum';
import { AuthFederateValidateService } from './auth-federate-validate.abstract';

@Injectable()
export class AuthFacebookValidateService extends AuthFederateValidateService {
  constructor(private readonly authFederateService: AuthFederateService) {
    super();
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.authFederateService.validate(AuthFederateEnum.FACEBOOK, {
      profileId: profile.id,
      email: this.getEmailByProfile(profile),
    });
  }
}
