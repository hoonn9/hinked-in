import { CoreHttpException } from '../../common/exception/core-http-exception';
import { FieldError } from '../../common/error/field.error';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';

export class MemberAlreadyExistException extends CoreHttpException {
  constructor(errors?: FieldError[]) {
    super(EXCEPTION_RESPONSE.MemberAlreadyExists, errors);
  }
}
