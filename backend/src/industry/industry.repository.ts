import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';
import { IndustryEntity } from './entity/industry.entity';
import { EntityNotExistException } from '../common/exception/custom-excpetion/entity-not-exist-exception';

@CustomRepository(IndustryEntity)
export class IndustryRepository extends CoreCustomRepository<IndustryEntity> {
  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const industry = await this.customQueryBuilder('industry', manager)
      .where('id = :id', { id })
      .getOne();

    if (!industry) {
      throw new EntityNotExistException('업계');
    }

    return industry;
  }
}
