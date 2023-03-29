import { Test } from '@nestjs/testing';
import { MemberService } from '../../../src/member/member.service';
import { faker } from '@faker-js/faker';
import { Member } from '../../../src/member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { MockCryptoModule } from '../../lib/mock/mock-crypto.module';
import { CryptoService } from '../../../src/crypto/crypto.service';
import { mockEntityManager } from '../../lib/mock/mock-typeorm';
import { MemberQueryService } from '../../../src/member/service/member-query.service';
import { MemberAlreadyExistException } from '../../../src/member/exception/member-already-exist.exception';

const mockMemberQueryService = {
  findByEmail: jest.fn(),
  findOneOrFail: jest.fn(),
};

describe('MemberService', () => {
  let memberService: MemberService;
  let cryptoService: CryptoService;
  let memberQueryService: MemberQueryService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [MockCryptoModule],
      providers: [
        MemberService,
        {
          provide: MemberQueryService,
          useValue: mockMemberQueryService,
        },
      ],
    }).compile();

    memberService = app.get(MemberService);
    cryptoService = app.get(CryptoService);
    memberQueryService = app.get(MemberQueryService);
  });

  describe('addMember', () => {
    it('성공 케이스', async () => {
      // Given
      const createMemberDto = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const em = {
        save: async (member: Member) => member,
      };

      const findByEmailFn = jest
        .spyOn(memberQueryService, 'findByEmail')
        .mockResolvedValueOnce(null);
      const saveFn = jest.spyOn(em, 'save').mockResolvedValueOnce(new Member());

      // When
      await memberService.addMember(createMemberDto, em as EntityManager);

      // Then
      expect(findByEmailFn.mock.calls[0][0]).toEqual(createMemberDto.email);
      expect(findByEmailFn.mock.calls[0][1]).toEqual(em);
      expect(saveFn.mock.calls[0][0].email).toEqual(createMemberDto.email);
      expect(saveFn.mock.calls[0][0].firstName).toEqual(
        createMemberDto.firstName,
      );
      expect(saveFn.mock.calls[0][0].lastName).toEqual(
        createMemberDto.lastName,
      );

      // hash password
      expect(saveFn.mock.calls[0][0].password).not.toEqual(
        createMemberDto.password,
      );
      await expect(
        cryptoService.comparePassword(
          createMemberDto.password,
          saveFn.mock.calls[0][0].password!,
        ),
      ).resolves.toEqual(true);
    });

    it('이미 존재하는 유저의 정보로 가입시 MemberAlreadyExistsException을 발생시킨다.', async () => {
      // Given
      const findByEmailFn = jest
        .spyOn(memberQueryService, 'findByEmail')
        .mockResolvedValueOnce(new Member());

      // When
      // Then
      await expect(
        memberService.addMember(
          {
            password: faker.internet.password(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          },
          mockEntityManager(),
        ),
      ).rejects.toThrow(MemberAlreadyExistException);

      expect(findByEmailFn).toHaveBeenCalled();
    });
  });
});
