import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { SchoolEntity } from '../entity/school.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreSearchableQueryService } from '../../common/service/core-searchable-query.service';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { SchoolCursor } from '../typing/school-cursor.type';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@Injectable()
export class SchoolQueryService extends CoreSearchableQueryService<SchoolEntity> {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
  ) {
    super(schoolRepository);
  }

  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const result = await this.createQueryBuilder('school', manager)
      .where('school.id = :id', { id })
      .getOne();

    if (!result) {
      throw new EntityNotExistException('학교');
    }

    return result;
  }

  async findMany(
    pagination: EntityPaginationOption,
    search?: EntitySearchOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = this.createQueryBuilder('school', manager);

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
