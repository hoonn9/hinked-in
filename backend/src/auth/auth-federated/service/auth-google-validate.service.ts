import { Injectable } from '@nestjs/common';
import { AuthFederatedService } from './auth-federated.service';
import { Member } from '../../../member/entity/member.entity';
import { Profile } from 'passport-google-oauth20';
import { AuthFederateEnum } from '../enum/auth-federate.enum';
import { AuthFederatedValidateService } from './auth-federated-validate.abstract';

@Injectable()
export class AuthGoogleValidateService extends AuthFederatedValidateService {
  constructor(private readonly authFederateService: AuthFederatedService) {
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
