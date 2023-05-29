import { EntityManager } from 'typeorm';
import { CustomRepository } from '../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../database/typeorm/core-custom.repository';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EntityNotExistException } from '../common/exception/custom-excpetion/entity-not-exist-exception';

@CustomRepository(EmploymentTypeEntity)
export class EmploymentTypeRepository extends CoreCustomRepository<EmploymentTypeEntity> {
  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const employmentType = await this.customQueryBuilder(
      'employment_type',
      manager,
    )
      .where('id = :id', { id })
      .getOne();

    if (!employmentType) {
      throw new EntityNotExistException('고용 타입');
    }

    return employmentType;
  }

  async isExistingName(name: string, manager?: EntityManager) {
    return this.customQueryBuilder('employment_type', manager)
      .where('name = :name', { name })
      .getExists();
  }
}
