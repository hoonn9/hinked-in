import { faker } from '@faker-js/faker';
import { mockDateColumns } from '../../lib/mock/util';
import { CompanyEntity } from '../../../src/company/entity/company.entity';

export class CompanyFixture {
  static createCompanyEntity(): CompanyEntity {
    const result: CompanyEntity = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      ownerId: faker.datatype.uuid(),
      owner: null,
      ...mockDateColumns(),
      ...mockDateColumns(),
    };

    return result;
  }
}
