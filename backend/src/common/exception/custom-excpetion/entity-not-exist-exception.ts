import { CoreHttpException } from '../core-http-exception';
import { EXCEPTION_RESPONSE } from '../constant';
import { ExceptionResponse } from '../exception.interface';

export class EntityNotExistException extends CoreHttpException {
  constructor(entityName?: string) {
    const response: ExceptionResponse = {
      ...EXCEPTION_RESPONSE.EntityNotExist,
    };
    if (entityName) {
      response.message = `존재하지 않는 ${entityName}입니다.`;
    }
    super(response);
  }
}
