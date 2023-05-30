import { Request } from 'express';
import { MemberEntity } from '../../member/entity/member.entity';

export type AuthRequest = Request & {
  user?: MemberEntity;
};
