import { EXCEPTION_RESPONSE } from '../../common/exception/constant';
import { CoreHttpException } from '../../common/exception/core-http-exception';

export class LoginFailException extends CoreHttpException {
  constructor() {
    super(EXCEPTION_RESPONSE.LoginFail);
  }
}
