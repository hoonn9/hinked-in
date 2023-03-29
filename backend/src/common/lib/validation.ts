import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exception/custom-excpetion/validation-exception';
import { Type } from '@nestjs/common';

export const ensureValidation = async <T extends Type>(cls: T, plain: any) => {
  const dto = plainToInstance(cls, plain);
  const errors = await validate(dto);

  if (errors.length) {
    throw new ValidationException(errors);
  }

  return dto;
};
