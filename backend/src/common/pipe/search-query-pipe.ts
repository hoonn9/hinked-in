import { PipeTransform, Injectable } from '@nestjs/common';
import {
  EntitySearchQueryDto,
  EntitySearchValidationQueryDto,
} from '../dto/entity-search.dto';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { InvalidInputError } from '../error/invalid-input.error';
import { plainToInstance } from 'class-transformer';
import { TransformPipe } from './transform-pipe';

interface SearchQueryPipeOption {
  required?: boolean;
}

@Injectable()
export class SearchQueryPipe extends TransformPipe implements PipeTransform {
  constructor(
    private readonly allowedFields: string[],
    private readonly options?: SearchQueryPipeOption,
  ) {
    super();
  }

  async transform(value: any): Promise<EntitySearchQueryDto | undefined> {
    const instance = await this.transformWithRequired(
      plainToInstance(EntitySearchValidationQueryDto, value),
      this.options?.required,
    );

    if (!instance) {
      return undefined;
    }

    this.validateAllowField(instance.field);

    return instance;
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
