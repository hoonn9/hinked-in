import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';
import { ExperienceEntity } from './entity/experience.entity';
import { MemberEntity } from '../member/entity/member.entity';

@CustomRepository(ExperienceEntity)
export class ExperienceRepository extends CoreCustomRepository<ExperienceEntity> {
  async findByMember(member: MemberEntity, em?: EntityManager) {
    return this.customQueryBuilder('experience', em)
      .where('experience.memberId = :memberId', { memberId: member.id })
      .getMany();
  }
}
