import { EntityManager } from 'typeorm';
import { CustomRepository } from '../../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../../database/typeorm/core-custom.repository';
import { MemberEntity } from '../../member/entity/member.entity';
import { FollowEntity } from '../entity/follow.entity';

@CustomRepository(FollowEntity)
export class FollowRepository extends CoreCustomRepository<FollowEntity> {
  async findOneByFollowerWithDeleted(
    targetId: string,
    follower: MemberEntity,
    manager?: EntityManager,
  ) {
    return this.customQueryBuilder('follow', manager)
      .where('follow.follower_id = :followerId', { followerId: follower.id })
      .andWhere('follow.following_id = :followingId', {
        followingId: targetId,
      })
      .withDeleted()
      .getOne();
  }

  async createFollow(
    targetId: string,
    follower: MemberEntity,
    manager: EntityManager,
  ) {
    const followEntity = FollowEntity.new({
      followingId: targetId,
      follower,
    });

    await manager.insert(FollowEntity, followEntity);

    return followEntity.id;
  }

  async recoveryFollow(follow: FollowEntity, manager: EntityManager) {
    await manager.update(
      FollowEntity,
      {
        id: follow.id,
      },
      {
        deleteDate: null,
      },
    );

    return follow.id;
  }

  async deleteFollow(follow: FollowEntity, manager: EntityManager) {
    await manager.softDelete(FollowEntity, {
      id: follow.id,
    });

    return follow;
  }

  async isFollowing(
    member: MemberEntity,
    followingId: string,
    manager: EntityManager,
  ) {
    return manager.exists(FollowEntity, {
      where: {
        follower: {
          id: member.id,
        },
        followingId,
      },
    });
  }
}
