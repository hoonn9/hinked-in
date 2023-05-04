import { PipeTransform, Injectable } from '@nestjs/common';
import {
  EntitySearchQueryDto,
  EntitySearchRequiredQueryDto,
} from '../dto/entity-search.dto';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { InvalidInputError } from '../error/invalid-input.error';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class SearchQueryPipe implements PipeTransform {
  constructor(private readonly allowedFields: string[]) {}

  async transform(value: EntitySearchQueryDto | EntitySearchRequiredQueryDto) {
    if (value instanceof EntitySearchQueryDto) {
      const errors = await validate(
        plainToInstance(EntitySearchRequiredQueryDto, value),
      );
      if (errors.length) {
        return undefined;
      }
    }
    this.validateAllowField(value.field);

    return value;
  }

  private validateAllowField(fields: string[]) {
    const invalidFields = fields.filter(
      (field) => !this.allowedFields.includes(field),
    );

    if (invalidFields.length > 0) {
      this.throwException(invalidFields);
    }
  }

  private throwException(invalidFields: string[]) {
    throw new InvalidInputException(
      invalidFields.map(
        (field) =>
          new InvalidInputError(field, {
            message: '검색할 수 없는 필드입니다.',
          }),
      ),
    );
  }
}
