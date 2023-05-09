import { faker } from '@faker-js/faker';
import { EmploymentTypeEntity } from '../../../src/employment-type/entity/employment-type.entity';
import { mockDateColumns } from '../../lib/mock/util';

export class EmploymentTypeFixture {
  static createEmploymentTypeEntity(): EmploymentTypeEntity {
    const result: EmploymentTypeEntity = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      ...mockDateColumns(),
    };

    return result;
  }
}
