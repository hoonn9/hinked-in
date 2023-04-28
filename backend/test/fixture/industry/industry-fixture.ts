import { faker } from '@faker-js/faker';
import { IndustryEntity } from '../../../src/industry/entity/industry.entity';

export class IndustryFixture {
  static createIndustryEntity(): IndustryEntity {
    const result: IndustryEntity = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    };

    return result;
  }
}
