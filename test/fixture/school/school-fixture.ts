import { faker } from '@faker-js/faker';
import { mockDateColumns } from '../../lib/mock/util';
import { SchoolEntity } from '../../../src/school/entity/school.entity';

export class SchoolFixture {
  static createSchoolEntity(): SchoolEntity {
    const result: SchoolEntity = {
      id: faker.datatype.uuid(),
      educations: [],
      name: faker.word.noun(),
      ...mockDateColumns(),
    };

    return result;
  }
}
