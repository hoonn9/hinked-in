import { InvalidInputError } from '../../../error/invalid-input.error';
import { EXCEPTION_RESPONSE } from '../../../exception/constant';
import { ExceptionExampleOption } from '../decorator/api-http-exception-response.decorator';

export const invalidInputExceptionExample: ExceptionExampleOption = {
  title: '요청 데이터가 제약 조건 검증에 실패했을 경우',
  description: '요청 데이터가 제약 조건 검증에 실패했을 때의 응답입니다.',
  type: InvalidInputError,
  response: EXCEPTION_RESPONSE.InvalidInputValue,
};
