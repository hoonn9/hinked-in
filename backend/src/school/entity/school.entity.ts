import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';

@Entity({ name: 'school' })
export class SchoolEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'school_pkey',
  })
  readonly id: string = genUUID();

  @Index('school_ix_name', {
    unique: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;
}
