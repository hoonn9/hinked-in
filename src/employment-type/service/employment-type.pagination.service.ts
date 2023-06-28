import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { EmploymentTypeEntity } from '../entity/employment-type.entity';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { CoreSearchableQueryService } from '../../common/service/core-searchable-pagination.service';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EmploymentTypeCursor } from '../typing/employment-type-cursor.type';
import { EmploymentTypeRepository } from '../employment-type.repository';

@Injectable()
export class EmploymentTypePaginationService extends CoreSearchableQueryService<EmploymentTypeEntity> {
  constructor(
    protected readonly employmentTypeRepository: EmploymentTypeRepository,
  ) {
    super();
  }

  async findMany(
    pagination: EntityPaginationOption,
    search?: EntitySearchOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = this.employmentTypeRepository.customQueryBuilder(
      'employment_type',
      manager,
    );

    if (search) {
      qb.andBracketWheres(this.getSearchWheres(qb, search));
    }

    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(
        qb,
        EmploymentTypeCursor,
        pagination,
        sortOptions,
      );
    }

    return this.getPaginationResult(qb, pagination, sortOptions);
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
}
