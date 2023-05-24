import { faker } from '@faker-js/faker';
import { CreateMemberBodyDto } from '../../../../src/member/dto/create-member.dto';
import { plainToInstance } from 'class-transformer';
import { validate, validateOrReject } from 'class-validator';

const correctPassword = 'asdf!1234';

describe('CreateMemberBodyDto', () => {
  it('성공 케이스', async () => {
    const plain: CreateMemberBodyDto = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: correctPassword,
    };
    const instance = plainToInstance(CreateMemberBodyDto, plain);
    await validateOrReject(instance);
  });

  it.each(['@emailid@email.com', '@email.com', 'username@email'])(
    '이메일 형식이 잘못된 경우 검증에 실패한다.',
    async (email) => {
      const plain: CreateMemberBodyDto = {
        email: email,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: correctPassword,
      };
      const instance = plainToInstance(CreateMemberBodyDto, plain);
      const errors = await validate(instance);
      expect(errors.length).toBe(1);
    },
  );

  test.each([
    [Array.from({ length: 7 }, () => 'a').join()],
    ['qwer1234'],
    ['qwerasdf'],
    ['aSdsS25432'],
    [Array.from({ length: 51 }, () => 'a').join()],
  ])('비밀번호 형식이 잘못된 경우 검증에 실패한다.', async (password) => {
    const plain: CreateMemberBodyDto = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: password,
    };
    const instance = plainToInstance(CreateMemberBodyDto, plain);
    const errors = await validate(instance);
    expect(errors.length).toBe(1);
  });

  it.each(['@emailid@email.com', '@email.com', 'username@email'])(
    '이메일 형식이 잘못된 경우 검증에 실패한다.',
    async (email) => {
      const plain: CreateMemberBodyDto = {
        email: email,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: correctPassword,
      };
      const instance = plainToInstance(CreateMemberBodyDto, plain);
      const errors = await validate(instance);
      expect(errors.length).toBe(1);
    },
  );

  test.each([[''], [Array.from({ length: 31 }, () => 'a').join()]])(
    'LastName 형식이 잘못된 경우 검증에 실패한다.',
    async (lastName) => {
      const plain: CreateMemberBodyDto = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: lastName,
        password: correctPassword,
      };
      const instance = plainToInstance(CreateMemberBodyDto, plain);
      const errors = await validate(instance);
      expect(errors.length).toBe(1);
    },
  );

  test.each([[''], [Array.from({ length: 31 }, () => 'a').join()]])(
    'LastName 형식이 잘못된 경우 검증에 실패한다.',
    async (firstName) => {
      const plain: CreateMemberBodyDto = {
        email: faker.internet.email(),
        firstName: firstName,
        lastName: faker.name.lastName(),
        password: correctPassword,
      };
      const instance = plainToInstance(CreateMemberBodyDto, plain);
      const errors = await validate(instance);
      expect(errors.length).toBe(1);
    },
  );
});
