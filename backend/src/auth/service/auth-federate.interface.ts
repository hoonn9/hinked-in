import { Member } from '../../member/entity/member.entity';
import { Profile } from 'passport';

export interface AuthFederateValidateService {
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<Member>;
}
