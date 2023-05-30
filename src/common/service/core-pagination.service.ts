import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { CustomQueryBuilder } from '../../database/typeorm/custom-query-builder';
import { decodeBase64, encodeBase64 } from '../util/base64';
import { Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrFail } from '../lib/validation';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { InvalidInputError } from '../error/invalid-input.error';
import { SortOrder } from '../type/common.type';
import { EntityPaginationOption } from '../interface/entity-pagination.interface';
import { EntitySortOption } from '../interface/entity-sort.interface';
import { snakeToCamel } from '../util/case';

export abstract class CorePaginationService<T extends ObjectLiteral> {
  getPaginationResult(
    queryResult: T[],
    pagination: EntityPaginationOption,
    sortOptions?: EntitySortOption[],
  ) {
    const nextCursor = this.getNextCursor(queryResult, pagination, sortOptions);

    if (nextCursor) {
      queryResult.pop();
    }
    return {
      list: queryResult,
      nextCursor,
    };
  }

  private getNextCursor(
    queryResult: T[],
    pagination: EntityPaginationOption,
    sortOptions?: EntitySortOption[],
  ): string | null {
    if (!this.hasNextCursor(queryResult, pagination)) {
      return null;
    }
    const cursorElement = queryResult[queryResult.length - 2];
    const cursor = this.makeNextCursor(cursorElement, sortOptions);

    return encodeBase64(cursor);
  }

  private makeNextCursor(entity: T, sortOptions?: EntitySortOption[]) {
    const result: Record<string, any> = {
      id: entity.id,
    };

    sortOptions?.forEach((sortOption) => {
      const field = snakeToCamel(sortOption.field);

      if (field in entity) {
        result[field] = entity[field];
      }
    });

    return result;
  }

  private async transformCursor<T extends object>(
    cursorText: string,
    cls: Type<T>,
  ) {
    const decoded = decodeBase64<T>(cursorText);

    if (decoded === null) {
      throw new InvalidInputException([
        new InvalidInputError('cursor', {
          message: '올바르지 않은 Cursor입니다.',
        }),
      ]);
    }

    const instance = plainToInstance(cls, decoded);

    await validateOrFail(instance);

    return instance;
  }

  private hasNextCursor(queryResult: T[], pagination: EntityPaginationOption) {
    return queryResult.length > pagination.limit;
  }

  async applyPagination(
    qb: CustomQueryBuilder<T>,
    cursorType: Type,
    pagination: EntityPaginationOption,
    sortOptions: EntitySortOption[] = [],
  ) {
    const take = pagination.limit + 1;

    if (!pagination.cursor) {
      qb.take(take);
      qb.addOrderBy('id', 'ASC');

      return qb;
    }

    const getEquality = (order: SortOrder) => {
      if (order === 'ASC') {
        return '>';
      }
      return '<';
    };

    const getCursorParam = (sortOption: EntitySortOption) => {
      const field = snakeToCamel(sortOption.field);

      return {
        field,
        key: `cursor_${field}`,
      };
    };

    if (!sortOptions.some((sortOption) => sortOption.field === 'id')) {
      sortOptions.push({
        field: 'id',
        order: 'ASC',
      });
    }

    const cursor = await this.transformCursor(pagination.cursor, cursorType);
    await validateOrFail(cursor);

    qb.andWhere(
      new Brackets((subQb) => {
        for (let i = 0; i < sortOptions.length; i++) {
          subQb.orWhere(
            new Brackets((subSubQb) => {
              for (let j = 0; j < i; j++) {
                const cursorParam = getCursorParam(sortOptions[j]);

                subSubQb.andWhere(
                  `${qb.alias}.${cursorParam.field} = :${cursorParam.key}`,
                  {
                    [cursorParam.key]: cursor[cursorParam.field],
                  },
                );
              }

              const cursorParam = getCursorParam(sortOptions[i]);

              subSubQb.andWhere(
                `${qb.alias}.${cursorParam.field} ${getEquality(
                  sortOptions[i].order,
                )} :${cursorParam.key}`,
                {
                  [cursorParam.key]: cursor[cursorParam.field],
                },
              );
            }),
          );
        }
      }),
    );

    qb.take(take);
    qb.addOrderBy('id', 'ASC');

    return qb;
  }

  applySort(qb: SelectQueryBuilder<T>, sortOptions: EntitySortOption[]) {
    sortOptions.forEach((sortOption) => {
      qb.addOrderBy(sortOption.field, sortOption.order);
    });
  }
}
