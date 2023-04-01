import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CoreQueryService } from '../../common/service/core-query.service';
import { EmploymentTypeEntity } from '../entity/employment-type.entity';

@Injectable()
export class EmploymentTypeQueryService extends CoreQueryService<EmploymentTypeEntity> {
  constructor(
    @InjectRepository(EmploymentTypeEntity)
    private readonly employmentTypeRepository: Repository<EmploymentTypeEntity>,
  ) {
    super(employmentTypeRepository);
  }

  async isExistingName(name: string, manager?: EntityManager) {
    return this.createQueryBuilder('employment_type', manager)
      .where('name = :name', { name })
      .getExists();
  }
}
