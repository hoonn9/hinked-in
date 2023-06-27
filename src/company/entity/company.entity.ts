import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { MemberEntity } from '../../member/entity/member.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'company_pkey',
  })
  readonly id: string = genUUID();

  @Column({ name: 'name', type: 'varchar', length: 300 })
  name: string;

  @RelationId((entity: CompanyEntity) => entity.owner)
  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => MemberEntity)
  @JoinColumn({
    name: 'owner_id',
    foreignKeyConstraintName: 'company_member_id_fkey',
    referencedColumnName: 'id',
  })
  owner: MemberEntity | null;
}
