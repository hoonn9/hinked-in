import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { genUUID } from '../../common/lib/uuid';
import { EmploymentTypeConstructorParams } from '../typing/employment-type.interface';
import { DateColumnEntity } from '../../common/entity/date-column.entity';

@Entity({ name: 'employment_type' })
export class EmploymentTypeEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'employment_type_pkey',
  })
  readonly id: string = genUUID();

  @Index('employment_type_ix_name', {
    unique: true,
  })
  @Column({
    type: 'text',
    name: 'name',
  })
  name: string;

  static new(params: EmploymentTypeConstructorParams) {
    const employmentType = new EmploymentTypeEntity();
    employmentType.name = params.name;

    return employmentType;
  }
}
