import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { WhereParams } from './interface/where.interface';

export class CustomQueryBuilder<
  T extends ObjectLiteral,
> extends SelectQueryBuilder<T> {
  andBracketWheres(wheres: WhereParams[]) {
    return this.andWhere(
      new Brackets((subQb) => {
        wheres.forEach((where) => {
          subQb.orWhere(where.where, where.parameters);
        });
      }),
    );
  }
}
