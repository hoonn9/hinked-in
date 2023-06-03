import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { genUUID } from '../../common/lib/uuid';
import { MemberEntity } from '../../member/entity/member.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { CompanyFollowConstructorParams } from '../typing/company-follow.type';
import { DateColumnEntity } from '../../common/entity/date-column.entity';

@Entity({
  name: 'company_follow',
})
export class CompanyFollowEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'company_follow_pkey',
  })
  readonly id: string = genUUID();

  @ManyToOne(() => MemberEntity, (member) => member.companyFollows)
  @JoinColumn({
    name: 'member_id',
    foreignKeyConstraintName: 'company_follow_member_id_fkey',
    referencedColumnName: 'id',
  })
  member: MemberEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.follows)
  @JoinColumn({
    name: 'company_id',
    foreignKeyConstraintName: 'company_follow_company_id_fkey',
    referencedColumnName: 'id',
  })
  company: CompanyEntity;

  static new(params: CompanyFollowConstructorParams) {
    const companyFollow = new CompanyFollowEntity();

    companyFollow.company = params.company;
    companyFollow.member = params.member;

    return companyFollow;
  }
}
