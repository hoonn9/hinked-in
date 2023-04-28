import { ColumnOptions, EntityManager } from 'typeorm';
import { mockAllFields } from './util';

export const MockTypeormDateColumns = () => {
  jest.mock('typeorm', () => {
    const plainTypeOrm = jest.requireActual('typeorm');

    return {
      ...plainTypeOrm,
      CreateDateColumn: (options: ColumnOptions) => {
        options.type = 'datetime';
        return plainTypeOrm.CreateDateColumn(options);
      },
      UpdateDateColumn: (options: ColumnOptions) => {
        options.type = 'datetime';
        return plainTypeOrm.UpdateDateColumn(options);
      },
      DeleteDateColumn: (options: ColumnOptions) => {
        options.type = 'datetime';
        return plainTypeOrm.DeleteDateColumn(options);
      },
    };
  });
};

export const mockEntityManager = () => mockAllFields(EntityManager);

export const mockRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    getExists: jest.fn().mockReturnThis(),
  }),
});
