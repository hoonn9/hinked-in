import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from '../../member/entity/member.entity';
import { AuthFederateEnum } from '../enum/auth-federate.enum';

@Entity()
export class FederatedCredential {
  @PrimaryGeneratedColumn('uuid', {
    name: 'federated_credential_id',
  })
  id: string;

  @Column({ type: 'text' })
  profileId: string;

  @Column({ type: 'varchar' })
  type: AuthFederateEnum;

  @ManyToOne(() => Member, {
    onDelete: 'CASCADE',
  })
  member: Member;
}
