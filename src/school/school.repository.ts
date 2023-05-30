import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';
import { SchoolEntity } from './entity/school.entity';
import { EntityNotExistException } from '../common/exception/custom-excpetion/entity-not-exist-exception';

@CustomRepository(SchoolEntity)
export class SchoolRepository extends CoreCustomRepository<SchoolEntity> {
  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const result = await this.customQueryBuilder('school', manager)
      .where('school.id = :id', { id })
      .getOne();

    if (!result) {
      throw new EntityNotExistException('학교');
    }

    return result;
  }
}
