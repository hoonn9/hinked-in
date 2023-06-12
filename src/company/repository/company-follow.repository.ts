import { EntityManager } from 'typeorm';
import { CustomRepository } from '../../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../../database/typeorm/core-custom.repository';
import { MemberEntity } from '../../member/entity/member.entity';
import { CompanyFollowEntity } from '../entity/company-follow.entity';
import { CompanyEntity } from '../entity/company.entity';

@CustomRepository(CompanyFollowEntity)
export class CompanyFollowRepository extends CoreCustomRepository<CompanyFollowEntity> {
  async findOneByMemberWithDeleted(
    company: CompanyEntity,
    member: MemberEntity,
    manager?: EntityManager,
  ) {
    return this.customQueryBuilder('companyFollow', manager)
      .where('companyFollow.member_id = :memberId', { memberId: member.id })
      .andWhere('companyFollow.company_id = :companyId', {
        companyId: company.id,
      })
      .withDeleted()
      .getOne();
  }

  async createCompanyFollow(
    company: CompanyEntity,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    const companyFollowEntity = CompanyFollowEntity.new({
      company,
      member,
    });

    await manager.insert(CompanyFollowEntity, companyFollowEntity);
    return companyFollowEntity.id;
  }

  async recoveryCompanyFollow(
    companyFollow: CompanyFollowEntity,
    manager: EntityManager,
  ) {
    await manager.update(
      CompanyFollowEntity,
      {
        id: companyFollow.id,
      },
      {
        deleteDate: null,
      },
    );

    return companyFollow.id;
  }

  async deleteCompanyFollow(
    companyFollow: CompanyFollowEntity,
    manager: EntityManager,
  ) {
    await manager.softDelete(CompanyFollowEntity, {
      id: companyFollow.id,
    });

    return companyFollow;
  }
}
