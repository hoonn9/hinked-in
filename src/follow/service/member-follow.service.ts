import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { FollowRepository } from '../repository/follow.repository';
import { MemberRepository } from '../../member/member.repository';
import { FollowEntity } from '../entity/follow.entity';
import { AlreadyExistException } from '../../common/exception/custom-excpetion/already-exist-exception';
import { MemberFollowDto } from '../dto/member-follow.dto';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@Injectable()
export class MemberFollowService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  async addMemberFollow(
    member: MemberEntity,
    targetMemberId: string,
    manager: EntityManager,
  ) {
    const targetMember = await this.memberRepository.findOneByIdOrFail(
      targetMemberId,
      manager,
    );

    const followWithDeleted =
      await this.followRepository.findOneByFollowerWithDeleted(
        targetMember.id,
        member,
        manager,
      );

    if (!FollowEntity.isCreatable(followWithDeleted)) {
      throw new AlreadyExistException('팔로우');
    }

    const createdFollowId = await this.createOrRecoveryFollow(
      targetMember.id,
      followWithDeleted,
      member,
      manager,
    );

    const createdFollowEntity = await manager.findOneOrFail(FollowEntity, {
      where: {
        id: createdFollowId,
      },
      relations: {
        follower: true,
      },
    });

    return MemberFollowDto.fromEntity(createdFollowEntity, targetMember);
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

  async removeMemberFollow(
    member: MemberEntity,
    targetMemberId: string,
    manager: EntityManager,
  ) {
    const targetMember = await this.memberRepository.findOneByIdOrFail(
      targetMemberId,
      manager,
    );

    const followWithDeleted =
      await this.followRepository.findOneByFollowerWithDeleted(
        targetMember.id,
        member,
        manager,
      );

    if (!FollowEntity.isDeletable(followWithDeleted)) {
      throw new EntityNotExistException('팔로우');
    }

    const deletedFollow = await this.followRepository.deleteFollow(
      followWithDeleted,
      manager,
    );

    deletedFollow.follower = member;

    return MemberFollowDto.fromEntity(deletedFollow, targetMember);
  }
}
