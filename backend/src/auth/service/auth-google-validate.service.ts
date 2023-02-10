import { Injectable } from '@nestjs/common';
import { AuthFederateService } from './auth-federate.service';
import { AuthFederateValidateService } from './auth-federate.interface';
import { Member } from '../../member/entity/member.entity';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthGoogleValidateService implements AuthFederateValidateService {
  constructor(private readonly authFederateService: AuthFederateService) {}

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<Member> {
    return this.authFederateService.validate(profile.id);
  }
}
