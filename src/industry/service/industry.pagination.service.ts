import { Injectable } from '@nestjs/common';
import { IndustryEntity } from '../entity/industry.entity';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { CoreSearchableQueryService } from '../../common/service/core-searchable-pagination.service';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { IndustryCursor } from '../typing/industry-cursor.type';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { IndustryRepository } from '../industry.repository';

@Injectable()
export class IndustryPaginationService extends CoreSearchableQueryService<IndustryEntity> {
  constructor(private readonly industryRepository: IndustryRepository) {
    super();
  }

  async findMany(
    pagination: EntityPaginationOption,
    search?: EntitySearchOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = this.industryRepository.customQueryBuilder('industry', manager);

    if (search) {
      qb.andBracketWheres(this.getSearchWheres(qb, search));
    }

    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(qb, IndustryCursor, pagination, sortOptions);
    }

    return this.getPaginationResult(qb, pagination, sortOptions);
  }

  protected makeSearchWhereParams(
    qb: SelectQueryBuilder<IndustryEntity>,
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
