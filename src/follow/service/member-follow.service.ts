import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { MemberRepository } from '../../member/member.repository';
import { MemberFollowDto } from '../dto/member-follow.dto';
import { FollowService } from './follow.service';

@Injectable()
export class MemberFollowService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly followService: FollowService,
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
    const createdFollow = await this.followService.addFollow(
      targetMember.id,
      member,
      manager,
    );

    return MemberFollowDto.fromEntity(createdFollow, targetMember);
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

    const deletedFollow = await this.followService.removeFollow(
      member,
      targetMember.id,
      manager,
    );

    deletedFollow.follower = member;

    return MemberFollowDto.fromEntity(deletedFollow, targetMember);
  }
}
