import { Test } from '@nestjs/testing';
import { MemberService } from '../../../src/member/member.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from '../../../src/member/entity/member.entity';
import { Repository } from 'typeorm';
import { MockCryptoModule } from '../../lib/mock/mock-crypto.module';
import { CryptoService } from '../../../src/crypto/crypto.service';

class MockMemberRepository {
  save(): Promise<void> {
    return Promise.resolve();
  }
}

describe('MemberService', () => {
  let memberService: MemberService;
  let cryptoService: CryptoService;
  let memberRepository: Repository<Member>;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [MockCryptoModule],
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useClass: MockMemberRepository,
        },
      ],
    }).compile();

    memberService = app.get(MemberService);
    cryptoService = app.get(CryptoService);
    memberRepository = app.get(getRepositoryToken(Member));
  });

  describe('addMember', () => {
    it('input의 password은 해싱되어 entity에 적용되어야 한다.', async () => {
      const plainPassword = faker.internet.password();

      const saveFn = jest
        .spyOn(memberRepository, 'save')
        .mockResolvedValueOnce(new Member());

      await memberService.addMember({
        password: plainPassword,
        email: faker.internet.email(),
      });

      expect(saveFn.mock.calls[0][0].password).not.toEqual(plainPassword);

      await expect(
        cryptoService.comparePassword(
          plainPassword,
          saveFn.mock.calls[0][0].password!,
        ),
      ).resolves.toEqual(true);
    });
  });

  it('input의 password가 없을 경우 entity의 password는 undefined가 되어야 한다.', async () => {
    const saveFn = jest.spyOn(memberRepository, 'save');

    await memberService.addMember({
      email: faker.internet.email(),
    });

    expect(saveFn.mock.calls[0][0].password).toEqual(undefined);
  });
});
