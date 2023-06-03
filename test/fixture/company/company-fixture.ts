import { faker } from '@faker-js/faker';
import { mockDateColumns } from '../../lib/mock/util';
import { CompanyEntity } from '../../../src/company/entity/company.entity';

export class CompanyFixture {
  static createCompanyEntity(): CompanyEntity {
    const result: CompanyEntity = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      follows: null,
      ...mockDateColumns(),
      ...mockDateColumns(),
    };

    return result;
  }
}
