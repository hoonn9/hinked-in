import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';

@Entity()
export class Member extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'member_id',
    primaryKeyConstraintName: 'pk_member',
  })
  readonly id: string;

  @Index('idx_member_email', { unique: true })
  @Column({ type: 'varchar', name: 'email', length: 320 })
  email: string;

  @Column({ type: 'varchar', name: 'password', nullable: true })
  password?: string | null;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 30,
    nullable: true,
  })
  phoneNumber: string;
}
