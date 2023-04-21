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
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiDateProperty } from '../../common/lib/swagger/decorator/api-date-property.decorator';
import { Type } from 'class-transformer';
import { ExperienceConstructorParams } from '../typing/experience.type';
import { MemberEntity } from '../../member/entity/member.entity';

@Entity({
  name: 'experience',
})
export class ExperienceEntity extends DateColumnEntity {
  @ApiUUIDProperty()
  @IsID()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'experience_pkey',
  })
  readonly id: string = genUUID();

  @ApiProperty({
    name: 'title',
  })
  @IsString()
  @Column({ type: 'varchar', name: 'title', length: 100 })
  title: string;

  @ManyToOne(() => EmploymentTypeEntity)
  @JoinColumn({
    name: 'employment_type_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'experience_employment_type_id_fkey',
  })
  employmentType: EmploymentTypeEntity | null;

  @ApiUUIDProperty()
  @IsID()
  @RelationId((entity: ExperienceEntity) => entity.employmentType)
  @Column({ type: 'uuid', name: 'employment_type_id' })
  employmentTypeId: string;

  @Column({ type: 'text', name: 'company_name' })
  companyName: string;

  @Column({ type: 'text', name: 'location' })
  location: string;

  @Column({ type: 'text', name: 'industry' })
  industry: string;

  @ApiPropertyOptional({
    name: 'description',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @ApiProperty({
    name: 'headline',
    type: String,
  })
  @Column({ type: 'varchar', name: 'headline', length: 300 })
  headline: string;

  @ApiDateProperty({
    name: 'startDate',
  })
  @IsDate()
  @Type(() => Date)
  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate: Date;

  @ApiDateProperty({
    name: 'endDate',
    isOptional: true,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Column({
    type: 'timestamp with time zone',
    name: 'end_date',
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

  @IsID()
  @Index('experience_ix_member_id')
  @RelationId((entity: ExperienceEntity) => entity.member)
  @Column({ type: 'uuid', name: 'member_id' })
  memberId: string;

  static new(params: ExperienceConstructorParams) {
    const experience = new ExperienceEntity();

    experience.title = params.title;
    experience.memberId = params.memberId;
    experience.employmentTypeId = params.employmentTypeId;
    experience.companyName = params.companyName;
    experience.location = params.location;
    experience.industry = params.industry;
    experience.description = params.description || null;
    experience.headline = params.headline;
    experience.startDate = params.startDate;
    experience.endDate = params.endDate || null;

    return experience;
  }
}
