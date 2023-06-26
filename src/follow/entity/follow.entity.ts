import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { MemberEntity } from '../../member/entity/member.entity';
import { FollowConstructorParams } from '../typing/follow.type';

@Entity({
  name: 'follow',
})
export class FollowEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'follow_pkey',
  })
  readonly id: string = genUUID();

  @ManyToOne(() => MemberEntity, (member) => member.followings)
  @JoinColumn({
    name: 'follower_id',
    foreignKeyConstraintName: 'follow_follower_id_fkey',
    referencedColumnName: 'id',
  })
  follower: MemberEntity;

  @Column({ type: 'uuid', name: 'following_id' })
  followingId: string;

  static new(params: FollowConstructorParams) {
    const follow = new FollowEntity();

    follow.follower = params.follower;
    follow.followingId = params.followingId;

    return follow;
  }

  static isCreatable(followWithDeleted: FollowEntity | null) {
    return (
      followWithDeleted === null ||
      FollowEntity.isSoftDeleted(followWithDeleted)
    );
  }

  static isDeletable(
    followWithDeleted: FollowEntity | null,
  ): followWithDeleted is FollowEntity {
    return (
      !!followWithDeleted && !FollowEntity.isSoftDeleted(followWithDeleted)
    );
  }
}
