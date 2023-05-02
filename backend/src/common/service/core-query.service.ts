import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { CustomQueryBuilder } from '../../database/typeorm/custom-query-builder';

export abstract class CoreQueryService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  createQueryBuilder(alias?: string, manager?: EntityManager) {
    const qb = this.repository.createQueryBuilder(alias, manager?.queryRunner);
    return new CustomQueryBuilder<T>(qb);
  }
}
