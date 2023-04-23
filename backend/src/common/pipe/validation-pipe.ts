import { ValidationError, ValidationPipe } from '@nestjs/common';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { InvalidInputError } from '../error/invalid-input.error';

const getExceptionFactory = (errors: ValidationError[]) => {
  return new InvalidInputException(
    errors.map(
      (error) => new InvalidInputError(error.property, error.constraints),
    ),
  );
};

export const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: getExceptionFactory,
});
