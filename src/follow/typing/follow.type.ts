import { MemberEntity } from '../../member/entity/member.entity';

export interface FollowConstructorParams {
  followingId: string;
  follower: MemberEntity;
}
