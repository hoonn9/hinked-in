import { MemberEntity } from '../../member/entity/member.entity';

export type AuthRequest = Express.Request & {
  user?: MemberEntity;
};
