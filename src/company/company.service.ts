import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { CompanyRepository } from './repository/company.repository';
import { GetCompanyDto, GetCompanyParamDto } from './dto/get-company.dto';
import { FollowRepository } from '../follow/repository/follow.repository';
import { FollowEntity } from '../follow/entity/follow.entity';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  async getCompany(
    dto: GetCompanyParamDto,
    member: MemberEntity | null,
    manager: EntityManager,
  ): Promise<GetCompanyDto> {
    const company = await this.companyRepository.findOneByIdOrFail(
      dto.id,
      manager,
    );

    const followCount = await manager.count(FollowEntity, {
      where: {
        followingId: company.id,
      },
    });

    let isFollowing: boolean | undefined = undefined;

    if (member) {
      isFollowing = await this.followRepository.isFollowing(
        member,
        company.id,
        manager,
      );
    }

    return GetCompanyDto.fromEntity(company, {
      followCount,
      isFollowing,
    });
  }
}
