import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(ValidationException.errorMessage(errors));
  }

  private static errorMessage(errors: ValidationError[]) {
    return errors
      .map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints);
        }
        return [];
      })
      .flat();
  }
}
