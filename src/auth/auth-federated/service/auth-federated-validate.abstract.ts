import { Profile } from 'passport';
import { MemberEntity } from '../../../member/entity/member.entity';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class AuthFederatedValidateService {
  abstract validate(profile: Profile): Promise<MemberEntity>;

  getEmailByProfile(profile: Profile): string {
    if (!profile.emails?.length) {
      throw new InternalServerErrorException();
    }

    const [email] = profile.emails.map((email) => email.value);

    return email;
  }
}
