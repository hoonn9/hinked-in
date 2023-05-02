import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { EmploymentTypeEntity } from '../entity/employment-type.entity';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { CoreSearchableQueryService } from '../../common/service/core-searchable-query.service';

@Injectable()
export class EmploymentTypeQueryService extends CoreSearchableQueryService<EmploymentTypeEntity> {
  constructor(
    @InjectRepository(EmploymentTypeEntity)
    protected readonly employmentTypeRepository: Repository<EmploymentTypeEntity>,
  ) {
    super(employmentTypeRepository);
  }

  async findMany(search?: EntitySearchOption, manager?: EntityManager) {
    const qb = this.createQueryBuilder('employment_type', manager);

    if (search) {
      qb.andBracketWheres(this.getSearchWheres(qb, search));
    }

    return qb.getMany();
  }

  protected makeSearchWhereParams(
    qb: SelectQueryBuilder<EmploymentTypeEntity>,
    keyword: string,
    field: string,
  ): WhereParams | null {
    if (field === 'name') {
      return {
        where: `${qb.alias}.name ILIKE :name_keyword`,
        parameters: {
          name_keyword: `%${keyword}%`,
        },
      };
    }

    return null;
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
