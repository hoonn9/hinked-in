import { EntityManager, ObjectLiteral, Repository } from 'typeorm';

export class CoreQueryService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  createQueryBuilder(alias?: string, manager?: EntityManager) {
    return this.repository.createQueryBuilder(alias, manager?.queryRunner);
  }
}
