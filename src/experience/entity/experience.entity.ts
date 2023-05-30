import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { EmploymentTypeEntity } from '../../employment-type/entity/employment-type.entity';
import { ExperienceConstructorParams } from '../typing/experience.type';
import { MemberEntity } from '../../member/entity/member.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { IndustryEntity } from '../../industry/entity/industry.entity';

@Entity({
  name: 'experience',
})
export class ExperienceEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'experience_pkey',
  })
  readonly id: string = genUUID();

  @Column({ type: 'varchar', name: 'title', length: 100 })
  title: string;

  @ManyToOne(() => EmploymentTypeEntity)
  @JoinColumn({
    name: 'employment_type_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'experience_employment_type_id_fkey',
  })
  employmentType: EmploymentTypeEntity | null;

  @RelationId((entity: ExperienceEntity) => entity.employmentType)
  @Column({ type: 'uuid', name: 'employment_type_id' })
  employmentTypeId: string;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'experience_company_id_fkey',
  })
  company: CompanyEntity | null;

  @RelationId((entity: ExperienceEntity) => entity.company)
  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string;

  @Column({ type: 'text', name: 'location' })
  location: string;

  @ManyToOne(() => IndustryEntity)
  @JoinColumn({
    foreignKeyConstraintName: 'experience_industry_id_fkey',
    name: 'industry_id',
    referencedColumnName: 'id',
  })
  industry: IndustryEntity | null;

  @RelationId((entity: ExperienceEntity) => entity.industry)
  @Column({ type: 'uuid', name: 'industry_id' })
  industryId: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', name: 'headline', length: 300 })
  headline: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'start_date',
    precision: 3,
  })
  startDate: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'end_date',
    precision: 3,
    nullable: true,
  })
  endDate: Date | null;

  @ManyToOne(() => MemberEntity, (member) => member.experiences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'member_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'experience_member_id_fkey',
  })
  member: MemberEntity | null;

  @Index('experience_ix_member_id')
  @RelationId((entity: ExperienceEntity) => entity.member)
  @Column({ type: 'uuid', name: 'member_id' })
  memberId: string;

  static new(params: ExperienceConstructorParams) {
    const experience = new ExperienceEntity();

    experience.title = params.title;
    experience.memberId = params.memberId;
    experience.employmentTypeId = params.employmentTypeId;
    experience.companyId = params.companyId;
    experience.location = params.location;
    experience.industryId = params.industryId;
    experience.description = params.description || null;
    experience.headline = params.headline;
    experience.startDate = params.startDate;
    experience.endDate = params.endDate || null;

    return experience;
  }
}
