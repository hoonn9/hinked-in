import { Injectable } from '@nestjs/common';
import { CompanyFollowRepository } from './repository/company-follow.repository';
import { MemberEntity } from '../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { CompanyRepository } from './repository/company.repository';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyFollowRepository: CompanyFollowRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async triggerCompanyFollow(
    member: MemberEntity,
    companyId: string,
    manager: EntityManager,
  ) {
    const company = await this.companyRepository.findOneByIdOrFail(
      companyId,
      manager,
    );

    const follow =
      await this.companyFollowRepository.findOneByMemberWithDeleted(
        company,
        member,
        manager,
      );

    if (follow) {
      if (follow.deleteDate) {
        return this.companyFollowRepository.recoveryCompanyFollow(
          follow,
          manager,
        );
      }
      return await this.companyFollowRepository.deleteCompanyFollow(
        follow,
        manager,
      );
    }

    await this.companyFollowRepository.createCompanyFollow(
      company,
      member,
      manager,
    );
  }
}
