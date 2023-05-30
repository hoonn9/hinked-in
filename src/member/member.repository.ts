import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';
import { MemberEntity } from './entity/member.entity';
import { MemberNotExistException } from './exception/member-not-exist.exception';

@CustomRepository(MemberEntity)
export class MemberRepository extends CoreCustomRepository<MemberEntity> {
  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const member = await this.customQueryBuilder('member', manager)
      .where('id = :id', { id })
      .getOne();

    if (member == null) {
      throw new MemberNotExistException();
    }

    return member;
  }

  async findOneByEmail(email: string, manager?: EntityManager) {
    return this.customQueryBuilder('member', manager)
      .where('email = :email', { email })
      .getOne();
  }
}
