import { Test } from '@nestjs/testing';
import { AuthLocalGuard } from '../../../../src/auth/auth-local/guard/auth-local.guard';
import { ValidationException } from '../../../../src/common/exception/validation-exception';
import { faker } from '@faker-js/faker';
import { mockExecutionContextRequestBody } from '../../../lib/execution-context';

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

    const ctx = mockExecutionContextRequestBody({
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
    'Request Body에 Email, Password 중 값이 하나라도 없는 경우 BadRequestException을 반환한다',
    (body) => {
      return expect(
        authLocalGuard.canActivate(mockExecutionContextRequestBody(body)),
      ).rejects.toBeInstanceOf(ValidationException);
    },
  );
});
