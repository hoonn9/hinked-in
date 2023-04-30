import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CoreQueryService } from '../../common/service/core-query.service';
import { EmploymentTypeEntity } from '../entity/employment-type.entity';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@Injectable()
export class EmploymentTypeQueryService extends CoreQueryService<EmploymentTypeEntity> {
  constructor(
    @InjectRepository(EmploymentTypeEntity)
    private readonly employmentTypeRepository: Repository<EmploymentTypeEntity>,
  ) {
    super(employmentTypeRepository);
  }

  async findMany(manager?: EntityManager) {
    return this.createQueryBuilder('employment_type', manager).getMany();
  }

  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const employmentType = await this.createQueryBuilder(
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
    return this.createQueryBuilder('employment_type', manager)
      .where('name = :name', { name })
      .getExists();
  }
}
