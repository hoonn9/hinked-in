import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { EducationEntity } from './entity/education.entity';
import { MemberEntity } from '../member/entity/member.entity';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';

@CustomRepository(EducationEntity)
export class EducationRepository extends CoreCustomRepository<EducationEntity> {
  async findByMember(
    member: MemberEntity,
    manager?: EntityManager,
  ): Promise<EducationEntity[]> {
    return this.customQueryBuilder('education', manager)
      .innerJoinAndSelect('education.school', 'school')
      .where('education.member_id = :memberId', { memberId: member.id })
      .getMany();
  }

  async createEducation(
    educationEntity: EducationEntity,
    manager: EntityManager,
  ) {
    await manager.insert(EducationEntity, educationEntity);
  }
}
