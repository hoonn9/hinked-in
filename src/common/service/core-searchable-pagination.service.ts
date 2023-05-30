import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { EntitySearchOption } from '../interface/entity-search.interface';
import { WhereParams } from '../../database/typeorm/interface/where.interface';
import { CorePaginationService } from './core-pagination.service';

export abstract class CoreSearchableQueryService<
  T extends ObjectLiteral,
> extends CorePaginationService<T> {
  getSearchWheres(qb: SelectQueryBuilder<T>, search: EntitySearchOption) {
    return search.field
      .map((field) => this.makeSearchWhereParams(qb, search.keyword, field))
      .filter((option): option is WhereParams => option !== null);
  }

  protected abstract makeSearchWhereParams(
    qb: SelectQueryBuilder<T>,
    keyword: string,
    field: string,
  ): WhereParams | null;
}
