import { ColumnOptions } from 'typeorm';

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
