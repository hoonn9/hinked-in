import { Profile } from 'passport';
import { Member } from '../../member/entity/member.entity';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class AuthFederatedValidateService {
  abstract validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<Member>;

  getEmailByProfile(profile: Profile): string {
    if (!profile.emails?.length) {
      throw new InternalServerErrorException();
    }

    const [email] = profile.emails.map((email) => email.value);

    return email;
  }
}
