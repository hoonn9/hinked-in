import { Injectable } from '@nestjs/common';
import { AuthFederateService } from './auth-federate.service';
import { Profile } from 'passport-facebook';
import { AuthFederateValidateService } from './auth-federate.interface';

@Injectable()
export class AuthFacebookValidateService
  implements AuthFederateValidateService
{
  constructor(private readonly authFederateService: AuthFederateService) {}

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.authFederateService.validate(profile.id);
  }
}
