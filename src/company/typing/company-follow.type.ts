import { MemberEntity } from '../../member/entity/member.entity';
import { CompanyEntity } from '../entity/company.entity';

export interface CompanyFollowConstructorParams {
  company: CompanyEntity;
  member: MemberEntity;
}
