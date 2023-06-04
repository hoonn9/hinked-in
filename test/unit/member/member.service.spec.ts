import { Test } from '@nestjs/testing';
import { MemberService } from '../../../src/member/member.service';
import { faker } from '@faker-js/faker';
import { MockCryptoModule } from '../../lib/mock/mock-crypto.module';
import { CryptoService } from '../../../src/crypto/crypto.service';
import { MemberAlreadyExistException } from '../../../src/member/exception/member-already-exist.exception';
import { MemberRepository } from '../../../src/member/member.repository';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';
import { MemberFixture } from '../../fixture/member/member-fixture';

const mockMemberRepository = {
  findOneByEmail: jest.fn(),
  findOneByIdOrFail: jest.fn(),
  createMember: jest.fn(),
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

      const manager = MockTypeOrmFactory.getEntityManager();

      const findByEmailFn = jest
        .spyOn(memberRepository, 'findOneByEmail')
        .mockResolvedValueOnce(null);
      const createMemberFn = jest.spyOn(memberRepository, 'createMember');

      // When
      await memberService.addMember(createMemberDto, manager);

      // Then
      expect(findByEmailFn).toHaveBeenCalledWith(
        createMemberDto.email,
        manager,
      );

      const createMemberFnParam = createMemberFn.mock.calls[0];

      expect(createMemberFnParam[0].email).toEqual(createMemberDto.email);
      expect(createMemberFnParam[0].firstName).toEqual(
        createMemberDto.firstName,
      );
      expect(createMemberFnParam[0].lastName).toEqual(createMemberDto.lastName);
      expect(createMemberFnParam[0].deleteDate).toBe(null);
      expect(typeof createMemberFnParam[0].id).toBe('string');

      // hash password
      expect(createMemberFnParam[0].password).not.toEqual(
        createMemberDto.password,
      );
      await expect(
        cryptoService.comparePassword(
          createMemberDto.password,
          createMemberFnParam[0].password!,
        ),
      ).resolves.toEqual(true);
    });

    it('이미 존재하는 유저의 정보로 가입시 MemberAlreadyExistsException을 발생시킨다.', async () => {
      // Given
      const dto = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const manager = MockTypeOrmFactory.getEntityManager();

      // When
      const findByEmailFn = jest
        .spyOn(memberRepository, 'findOneByEmail')
        .mockResolvedValueOnce(MemberFixture.createMemberEntity());

      // Then
      await expect(memberService.addMember(dto, manager)).rejects.toThrow(
        MemberAlreadyExistException,
      );

      expect(findByEmailFn).toHaveBeenCalled();
    });
  });
});
