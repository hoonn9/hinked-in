import { ValidationException } from '../../../../src/common/exception/validation-exception';
import { BadRequestException } from '@nestjs/common';

describe('ValidationException', () => {
  it('ValidationException은 BadRequestException의 인스턴스여야 한다.', () => {
    const exception = new ValidationException([]);
    expect(exception instanceof BadRequestException).toBe(true);
  });
});
