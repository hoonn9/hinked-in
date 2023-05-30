import { CoreHttpException } from '../../common/exception/core-http-exception';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';

export class MemberNotExistException extends CoreHttpException {
  constructor() {
    super(EXCEPTION_RESPONSE.MemberNotExist);
  }
}
