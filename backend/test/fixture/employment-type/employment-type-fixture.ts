import { faker } from '@faker-js/faker';
import { EmploymentTypeEntity } from '../../../src/employment-type/entity/employment-type.entity';

export class EmploymentTypeFixture {
  static createEmploymentTypeEntity(): EmploymentTypeEntity {
    const result: EmploymentTypeEntity = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    };

    return result;
  }
}
