import {
  EntityManager,
  ObjectLiteral,
  QueryBuilder,
  Repository,
} from 'typeorm';
import { mockAllFields } from './util';
import { CustomQueryBuilder } from '../../../src/database/typeorm/custom-query-builder';

export const mockEntityManager = () => mockAllFields(EntityManager);

export const mockQueryBuilder = <T extends ObjectLiteral>() => {
  const result = {
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    getExists: jest.fn().mockReturnThis(),
  } as unknown as QueryBuilder<T>;

  return result;
};

export const mockCustomQueryBuilder = <T extends ObjectLiteral>() => {
  const result = {
    ...mockQueryBuilder(),
    andBracketWheres: jest.fn().mockReturnThis(),
  } as unknown as CustomQueryBuilder<T>;

  return result;
};

export const mockRepository = <T extends ObjectLiteral>(): Repository<T> => {
  const result = {
    createQueryBuilder: jest.fn().mockReturnValue({
      ...mockQueryBuilder,
    }),
  } as unknown as Repository<T>;

  return result;
};
