import { CoreHttpException } from '../core-http-exception';
import { EXCEPTION_RESPONSE } from '../constant';
import { ExceptionResponse } from '../exception.interface';

export class AlreadyExistException extends CoreHttpException {
  constructor(entityName?: string) {
    const response: ExceptionResponse = {
      ...EXCEPTION_RESPONSE.AlreadyExists,
    };
    if (entityName) {
      response.message = `이미 존재하는 ${entityName}입니다.`;
    }
    super(response);
  }
}
