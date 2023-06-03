import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { CompanyFollowEntity } from './company-follow.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'company_pkey',
  })
  readonly id: string = genUUID();

  @Column({ name: 'name', type: 'varchar', length: 300 })
  name: string;

  @OneToMany(() => CompanyFollowEntity, (follow) => follow.company)
  follows: CompanyFollowEntity[] | null;
}
