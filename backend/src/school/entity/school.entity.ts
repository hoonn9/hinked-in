import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';

@Entity({ name: 'school' })
export class SchoolEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'school_pkey',
  })
  readonly id: string = genUUID();

  @Column({ type: 'varchar', name: 'name' })
  name: string;
}
