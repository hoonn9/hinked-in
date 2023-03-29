import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { Type } from '@nestjs/common';
import { InvalidInputError } from '../error/invalid-input.error';

export const ensureValidation = async <T extends Type>(cls: T, plain: any) => {
  const dto = plainToInstance(cls, plain);
  const errors = await validate(dto);

  if (errors.length) {
    throw new InvalidInputException(
      errors.map(
        (error) => new InvalidInputError(error.property, error.constraints),
      ),
    );
  }

  return dto;
};
