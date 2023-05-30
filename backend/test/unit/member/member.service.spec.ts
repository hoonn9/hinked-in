import { Test } from '@nestjs/testing';
import { MemberService } from '../../../src/member/member.service';
import { faker } from '@faker-js/faker';
import { MemberEntity } from '../../../src/member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { MockCryptoModule } from '../../lib/mock/mock-crypto.module';
import { CryptoService } from '../../../src/crypto/crypto.service';
import { MemberAlreadyExistException } from '../../../src/member/exception/member-already-exist.exception';
import { MemberRepository } from '../../../src/member/member.repository';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';

const mockMemberRepository = {
  findOneByEmail: jest.fn(),
  findOneByIdOrFail: jest.fn(),
};

describe('MemberService', () => {
  let memberService: MemberService;
  let cryptoService: CryptoService;
  let memberRepository: MemberRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [MockCryptoModule],
      providers: [
        MemberService,
        {
          provide: MemberRepository,
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    memberService = app.get(MemberService);
    cryptoService = app.get(CryptoService);
    memberRepository = app.get(MemberRepository);
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
        save: async (member: MemberEntity) => member,
      };

      const findByEmailFn = jest
        .spyOn(memberRepository, 'findOneByEmail')
        .mockResolvedValueOnce(null);
      const saveFn = jest
        .spyOn(em, 'save')
        .mockResolvedValueOnce(new MemberEntity());

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
        .spyOn(memberRepository, 'findOneByEmail')
        .mockResolvedValueOnce(new MemberEntity());

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
          MockTypeOrmFactory.getEntityManager(),
        ),
      ).rejects.toThrow(MemberAlreadyExistException);

      expect(findByEmailFn).toHaveBeenCalled();
    });
  });
});
