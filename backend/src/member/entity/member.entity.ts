import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { MemberConstructorParams } from '../typing/member.type';
import { genUUID } from '../../common/lib/uuid';

@Entity()
export class Member extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'member_id',
    primaryKeyConstraintName: 'pk_member',
  })
  readonly id: string = genUUID();

  @Index('idx_member_email', { unique: true })
  @Column({ type: 'varchar', name: 'email', length: 320 })
  email: string;

  @Column({ type: 'varchar', name: 'last_name', length: 30, nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', name: 'first_name', length: 30, nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', name: 'password', nullable: true })
  password: string | null;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 30,
    nullable: true,
  })
  phoneNumber: string | null;

  static new(params: MemberConstructorParams) {
    const member = new Member();

    member.email = params.email;
    member.lastName = params.lastName || null;
    member.firstName = params.firstName || null;
    member.password = params.password || null;
    member.phoneNumber = params.phoneNumber || null;

    return member;
  }
}
