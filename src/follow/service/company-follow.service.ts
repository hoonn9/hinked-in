import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { CompanyFollowDto } from '../dto/company-follow.dto';
import { CompanyRepository } from '../../company/repository/company.repository';
import { FollowService } from './follow.service';

@Injectable()
export class CompanyFollowService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly followService: FollowService,
  ) {}

  async addCompanyFollow(
    member: MemberEntity,
    targetCompanyId: string,
    manager: EntityManager,
  ) {
    const company = await this.companyRepository.findOneByIdOrFail(
      targetCompanyId,
      manager,
    );

    const createdFollow = await this.followService.addFollow(
      company.id,
      member,
      manager,
    );

    return CompanyFollowDto.fromEntity(createdFollow, company);
  }

  async removeCompanyFollow(
    member: MemberEntity,
    companyId: string,
    manager: EntityManager,
  ) {
    const company = await this.companyRepository.findOneByIdOrFail(
      companyId,
      manager,
    );

    const deletedFollow = await this.followService.removeFollow(
      member,
      companyId,
      manager,
    );

    deletedFollow.follower = member;

    return CompanyFollowDto.fromEntity(deletedFollow, company);
  }
}
