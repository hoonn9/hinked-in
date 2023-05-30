import { CoreHttpException } from '../core-http-exception';
import { EXCEPTION_RESPONSE } from '../constant';
import { InvalidInputError } from '../../error/invalid-input.error';

export class InvalidInputException extends CoreHttpException {
  constructor(errors: InvalidInputError[]) {
    super(EXCEPTION_RESPONSE.InvalidInputValue, errors);
  }
}
