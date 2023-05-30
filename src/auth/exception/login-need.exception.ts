import { EXCEPTION_RESPONSE } from '../../common/exception/constant';
import { CoreHttpException } from '../../common/exception/core-http-exception';

export class LoginNeedException extends CoreHttpException {
  constructor() {
    super(EXCEPTION_RESPONSE.LoginNeed);
  }
}
