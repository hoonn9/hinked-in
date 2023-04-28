import { faker } from '@faker-js/faker';
import { genUUID } from '../../../src/common/lib/uuid';
import { MemberEntity } from '../../../src/member/entity/member.entity';
import { mockDateColumns } from '../../lib/mock/util';

export class MemberFixture {
  static createMemberEntity(params?: Partial<MemberEntity>): MemberEntity {
    const result: MemberEntity = {
      id: genUUID(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      experiences: null,
      phoneNumber: faker.phone.number('010########'),
      ...mockDateColumns(),
      ...params,
    };

    return result;
  }
}
