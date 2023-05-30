import { EntityManager, ObjectLiteral } from 'typeorm';
import { mockAllFields } from './util';
import { CoreCustomRepository } from '../../../src/database/typeorm/core-custom.repository';
import { Type } from '@nestjs/common';

const mockQueryBuilder = {
  where: jest.fn().mockReturnThis(),
  getOne: jest.fn().mockReturnThis(),
  getExists: jest.fn().mockReturnThis(),
};

const mockCustomQueryBuilder = {
  ...mockQueryBuilder,
  andBracketWheres: jest.fn().mockReturnThis(),
};

export class MockTypeOrmFactory {
  static getEntityManager() {
    return mockAllFields(EntityManager);
  }

  static getCustomRepository<
    T extends ObjectLiteral,
    R extends CoreCustomRepository<T>,
  >(repository: Type<R>) {
    const coreCustomRepository: Record<string, any> = {
      target: jest.fn(),
      queryRunner: jest.fn(),
      manager: MockTypeOrmFactory.getEntityManager(),
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      customQueryBuilder: jest.fn().mockReturnValue(mockCustomQueryBuilder),
    };

    Object.getOwnPropertyNames(repository.prototype)
      .filter((field) => field !== 'constructor')
      .forEach((field) => {
        coreCustomRepository[field] = repository.prototype[field];
      });

    return coreCustomRepository as R;
  }
}
