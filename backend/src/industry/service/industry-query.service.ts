import { Injectable } from '@nestjs/common';
import { IndustryEntity } from '../entity/industry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';
import { CoreSearchableQueryService } from '../../common/service/core-searchable-query.service';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySearchOption } from '../../common/interface/entity-search.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { IndustryCursor } from '../typing/industry-cursor.type';
import { WhereParams } from '../../database/typeorm/interface/where.interface';

@Injectable()
export class IndustryQueryService extends CoreSearchableQueryService<IndustryEntity> {
  constructor(
    @InjectRepository(IndustryEntity)
    private readonly industryRepository: Repository<IndustryEntity>,
  ) {
    super(industryRepository);
  }

  async findMany(
    pagination: EntityPaginationOption,
    search?: EntitySearchOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = this.createQueryBuilder('industry', manager);

    if (search) {
      qb.andBracketWheres(this.getSearchWheres(qb, search));
    }

    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(qb, IndustryCursor, pagination, sortOptions);
    }

    const result = await qb.getMany();
    return this.getPaginationResult(result, pagination, sortOptions);
  }

  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const industry = await this.createQueryBuilder('industry', manager)
      .where('id = :id', { id })
      .getOne();

    if (!industry) {
      throw new EntityNotExistException('업계');
    }

    return industry;
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
