import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { EmploymentTypeEntity } from '../../employment-type/entity/employment-type.entity';

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
  employmentType: EmploymentTypeEntity;

  @Column({ type: 'text', name: 'company_name' })
  companyName: string;

  @Column({ type: 'text', name: 'location' })
  location: string;

  @Column({ type: 'text', name: 'industry' })
  industry: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', name: 'headline', length: 300 })
  headline: string;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'end_date',
    nullable: true,
  })
  endDate: Date | null;
}
