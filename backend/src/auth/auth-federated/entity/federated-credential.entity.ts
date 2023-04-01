import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  JoinColumn,
  Index,
} from 'typeorm';
import { MemberEntity } from '../../../member/entity/member.entity';
import { AuthFederateEnum } from '../enum/auth-federate.enum';

@Entity({
  name: 'federated_credential',
})
export class FederatedCredentialEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'federated_credential_pkey',
  })
  id: string;

  @Column({ type: 'text', name: 'profile_id' })
  profileId: string;

  @Column({ type: 'varchar', name: 'type' })
  type: AuthFederateEnum;

  @ManyToOne(() => MemberEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'member_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'federated_credential_member_id_fkey',
  })
  member: MemberEntity;

  @Index('federated_credential_ix_member_id')
  @RelationId((entity: FederatedCredentialEntity) => entity.member)
  @Column({ type: 'uuid', name: 'member_id' })
  memberId: string;
}
