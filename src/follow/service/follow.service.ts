import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { FollowRepository } from '../repository/follow.repository';
import { FollowEntity } from '../entity/follow.entity';
import { AlreadyExistException } from '../../common/exception/custom-excpetion/already-exist-exception';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async addFollow(
    targetId: string,
    follower: MemberEntity,
    manager: EntityManager,
  ) {
    const followWithDeleted =
      await this.followRepository.findOneByFollowerWithDeleted(
        targetId,
        follower,
        manager,
      );

    if (!FollowEntity.isCreatable(followWithDeleted)) {
      throw new AlreadyExistException('팔로우');
    }

    const createdFollowId = await this.createOrRecoveryFollow(
      targetId,
      followWithDeleted,
      follower,
      manager,
    );

    return manager.findOneOrFail(FollowEntity, {
      where: {
        id: createdFollowId,
      },
      relations: {
        follower: true,
      },
    });
  }

  async removeFollow(
    member: MemberEntity,
    targetId: string,
    manager: EntityManager,
  ) {
    const followWithDeleted =
      await this.followRepository.findOneByFollowerWithDeleted(
        targetId,
        member,
        manager,
      );

    if (!FollowEntity.isDeletable(followWithDeleted)) {
      throw new EntityNotExistException('팔로우');
    }

    return this.followRepository.deleteFollow(followWithDeleted, manager);
  }

  private createOrRecoveryFollow(
    targetId: string,
    followWithDeleted: FollowEntity | null,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    if (followWithDeleted) {
      return this.followRepository.recoveryFollow(followWithDeleted, manager);
    }
    return this.followRepository.createFollow(targetId, member, manager);
  }
}
