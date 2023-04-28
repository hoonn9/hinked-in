import { faker } from '@faker-js/faker';
import { DateColumnEntity } from '../../../src/common/entity/date-column.entity';

export const mockAllFields = <T>(
  classRef: new (...args: any[]) => T,
): jest.Mocked<T> => {
  const mockedObject = {} as jest.Mocked<T>;

  Object.getOwnPropertyNames(classRef.prototype).forEach((methodName) => {
    if (methodName !== 'constructor') {
      const key = methodName as keyof T;
      mockedObject[key] = jest.fn() as any;
    }
  });

  return mockedObject;
};

export const mockDateColumns = (params?: Partial<DateColumnEntity>) => {
  const date = faker.date.past();
  const result: DateColumnEntity = {
    createDate: date,
    updateDate: date,
    deleteDate: null,
    ...params,
  };
  return result;
};
