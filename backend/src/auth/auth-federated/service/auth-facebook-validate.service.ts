import { Injectable } from '@nestjs/common';
import { AuthFederatedService } from './auth-federated.service';
import { Profile } from 'passport-facebook';
import { AuthFederateEnum } from '../enum/auth-federate.enum';
import { AuthFederatedValidateService } from './auth-federated-validate.abstract';

@Injectable()
export class AuthFacebookValidateService extends AuthFederatedValidateService {
  constructor(private readonly authFederateService: AuthFederatedService) {
    super();
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.authFederateService.validate(AuthFederateEnum.FACEBOOK, {
      profileId: profile.id,
      email: this.getEmailByProfile(profile),
    });
  }
}
