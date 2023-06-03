import { EntityManager } from 'typeorm';
import { CustomRepository } from '../../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../../database/typeorm/core-custom.repository';
import { CompanyEntity } from '../entity/company.entity';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@CustomRepository(CompanyEntity)
export class CompanyRepository extends CoreCustomRepository<CompanyEntity> {
  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const company = await this.customQueryBuilder('company', manager)
      .where('id = :id', { id })
      .getOne();

    if (!company) {
      throw new EntityNotExistException('회사');
    }

    return company;
  }
}
