import { Injectable } from '@nestjs/common';
import { CompanyFollowRepository } from './repository/company-follow.repository';
import { MemberEntity } from '../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { CompanyRepository } from './repository/company.repository';
import { AlreadyExistException } from '../common/exception/custom-excpetion/already-exist-exception';
import { EntityNotExistException } from '../common/exception/custom-excpetion/entity-not-exist-exception';
import { CompanyFollowDto } from './dto/company-follow.dto';
import { CompanyFollowEntity } from './entity/company-follow.entity';
import { CompanyEntity } from './entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyFollowRepository: CompanyFollowRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async addCompanyFollow(
    member: MemberEntity,
    companyId: string,
    manager: EntityManager,
  ) {
    const company = await this.companyRepository.findOneByIdOrFail(
      companyId,
      manager,
    );

    const followWithDeleted =
      await this.companyFollowRepository.findOneByMemberWithDeleted(
        company,
        member,
        manager,
      );
    console.log(followWithDeleted);
    if (!this.isCreatable(followWithDeleted)) {
      throw new AlreadyExistException('팔로우');
    }

    const createdCompanyFollowId = await this.createOrRecoveryCompanyFollow(
      company,
      followWithDeleted,
      member,
      manager,
    );

    const createdCompanyFollowEntity = await manager.findOneOrFail(
      CompanyFollowEntity,
      {
        where: {
          id: createdCompanyFollowId,
        },
        relations: {
          company: true,
        },
      },
    );

    return CompanyFollowDto.fromEntity(createdCompanyFollowEntity);
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

    const followWithDeleted =
      await this.companyFollowRepository.findOneByMemberWithDeleted(
        company,
        member,
        manager,
      );

    if (!this.isDeletable(followWithDeleted)) {
      throw new EntityNotExistException('팔로우');
    }

    const deletedCompanyFollow =
      await this.companyFollowRepository.deleteCompanyFollow(
        followWithDeleted,
        manager,
      );

    deletedCompanyFollow.company = await manager.findOneOrFail(CompanyEntity, {
      where: {
        id: company.id,
      },
    });

    return CompanyFollowDto.fromEntity(deletedCompanyFollow);
  }

  private createOrRecoveryCompanyFollow(
    company: CompanyEntity,
    followWithDeleted: CompanyFollowEntity | null,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    if (followWithDeleted) {
      return this.companyFollowRepository.recoveryCompanyFollow(
        followWithDeleted,
        manager,
      );
    }
    return this.companyFollowRepository.createCompanyFollow(
      company,
      member,
      manager,
    );
  }

  private isCreatable(followWithDeleted: CompanyFollowEntity | null) {
    return (
      followWithDeleted === null ||
      CompanyFollowEntity.isSoftDeleted(followWithDeleted)
    );
  }

  private isDeletable(
    followWithDeleted: CompanyFollowEntity | null,
  ): followWithDeleted is CompanyFollowEntity {
    return (
      !!followWithDeleted &&
      !CompanyFollowEntity.isSoftDeleted(followWithDeleted)
    );
  }
}
