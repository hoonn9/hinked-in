import { Test } from '@nestjs/testing';
import { AuthLocalGuard } from '../../../../src/auth/auth-local/guard/auth-local.guard';
import { InvalidInputException } from '../../../../src/common/exception/custom-excpetion/invalid-input-exception';
import { faker } from '@faker-js/faker';
import { MockHttpFactory } from '../../../lib/mock/mock-http';

describe('AuthLocalGuard', () => {
  let authLocalGuard: AuthLocalGuard;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthLocalGuard],
    }).compile();

    authLocalGuard = app.get(AuthLocalGuard);
  });

  it('Request Body에 올바른 Email, Password이 포함되어 있으면 AuthGuard의 canActivate 메소드를 실행한다.', async () => {
    const superCanActivateFn = jest
      .spyOn(AuthLocalGuard.prototype, 'canActivate')
      .mockResolvedValueOnce(true);

    const ctx = MockHttpFactory.getExecutionContextRequestBody({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await authLocalGuard.canActivate(ctx);

    expect(superCanActivateFn).toHaveBeenCalledWith(ctx);
  });

  it.each([
    {},
    { email: faker.internet.email() },
    {
      password: faker.internet.password(),
    },
  ])(
    'Request Body에 Email, Password 중 값이 하나라도 없는 경우 ValidationException를 발생시킨다',
    (body) => {
      return expect(
        authLocalGuard.canActivate(
          MockHttpFactory.getExecutionContextRequestBody(body),
        ),
      ).rejects.toBeInstanceOf(InvalidInputException);
    },
  );
});
