import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { mockAllFields } from './util';

export const mockEntityManager = () => mockAllFields(EntityManager);

export const mockRepository = <T extends ObjectLiteral>(): Repository<T> => {
  const result = {
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      getExists: jest.fn().mockReturnThis(),
    }),
  } as unknown as Repository<T>;

  return result;
};
