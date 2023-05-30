import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { SchoolEntity } from '../entity/school.entity';
import { CoreSearchableQueryService } from '../../common/service/core-searchable-pagination.service';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { SchoolCursor } from '../typing/school-cursor.type';
import { SchoolRepository } from '../school.repository';

@Injectable()
export class SchoolPaginationService extends CoreSearchableQueryService<SchoolEntity> {
  constructor(private readonly schoolRepository: SchoolRepository) {
    super();
  }

  async findMany(
    pagination: EntityPaginationOption,
    search?: EntitySearchOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = this.schoolRepository.customQueryBuilder('school', manager);

    if (search) {
      qb.andBracketWheres(this.getSearchWheres(qb, search));
    }

    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(qb, SchoolCursor, pagination, sortOptions);
    }

    const result = await qb.getMany();
    return this.getPaginationResult(result, pagination, sortOptions);
  }

  protected makeSearchWhereParams(
    qb: SelectQueryBuilder<SchoolEntity>,
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
