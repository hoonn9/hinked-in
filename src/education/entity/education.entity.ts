import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { MemberEntity } from '../../member/entity/member.entity';
import { SchoolEntity } from '../../school/entity/school.entity';
import { EducationConstructorParams } from '../typing/education.type';

@Entity({
  name: 'education',
})
export class EducationEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'education_pkey',
  })
  readonly id: string = genUUID();

  @Column({ type: 'varchar', name: 'field_of_study', nullable: true })
  fieldOfStudy: string | null;

  @Column({ type: 'varchar', name: 'degree', nullable: true })
  degree: string | null;

  @Column({ type: 'varchar', name: 'grade', nullable: true })
  grade: string | null;

  @Column({
    type: 'timestamp with time zone',
    name: 'start_date',
    precision: 3,
    nullable: true,
  })
  startDate: Date | null;

  @Column({
    type: 'timestamp with time zone',
    name: 'end_date',
    precision: 3,
    nullable: true,
  })
  endDate: Date | null;

  @ManyToOne(() => SchoolEntity, (school) => school.educations)
  @Index('education_ix_school_id')
  @JoinColumn({
    name: 'school_id',
    foreignKeyConstraintName: 'education_school_id_fkey',
    referencedColumnName: 'id',
  })
  school: SchoolEntity;

  @ManyToOne(() => MemberEntity, (member) => member.educations)
  @Index('education_ix_member_id')
  @JoinColumn({
    name: 'member_id',
    foreignKeyConstraintName: 'education_member_id_fkey',
    referencedColumnName: 'id',
  })
  member: MemberEntity;

  static new(params: EducationConstructorParams): EducationEntity {
    const entity = new EducationEntity();

    entity.degree = params.degree || null;
    entity.fieldOfStudy = params.fieldOfStudy || null;
    entity.grade = params.grade || null;
    entity.startDate = params.startDate || null;
    entity.endDate = params.endDate || null;
    entity.school = params.school;
    entity.member = params.member;

    return entity;
  }
}
