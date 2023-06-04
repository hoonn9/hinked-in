import { faker } from '@faker-js/faker';
import { mockDateColumns } from '../../lib/mock/util';
import { ExperienceEntity } from '../../../src/experience/entity/experience.entity';

export class ExperienceFixture {
  static createExperienceEntity(): ExperienceEntity {
    const result: ExperienceEntity = {
      id: faker.datatype.uuid(),
      employmentTypeId: faker.datatype.uuid(),
      companyId: faker.datatype.uuid(),
      industryId: faker.datatype.uuid(),
      location: faker.word.noun(),
      description: faker.lorem.paragraph(),
      headline: faker.lorem.text(),
      title: faker.lorem.text(),
      endDate: faker.date.future(),
      startDate: faker.date.past(),
      company: null,
      employmentType: null,
      industry: null,
      member: null,
      memberId: faker.datatype.uuid(),
      ...mockDateColumns(),
    };

    return result;
  }
}
