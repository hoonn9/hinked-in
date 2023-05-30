import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidInputException } from '../exception/custom-excpetion/invalid-input-exception';
import { InvalidInputError } from '../error/invalid-input.error';
import { plainToInstance } from 'class-transformer';
import {
  EntitySortQueryDto,
  EntitySortValidationQueryDto,
} from '../dto/entity-sort.dto';
import { SortOrder } from '../type/common.type';
import { TransformPipe } from './transform-pipe';

interface SortQueryPipeOption {
  required?: boolean;
}

@Injectable()
export class SortQueryPipe extends TransformPipe implements PipeTransform {
  constructor(
    private readonly allowedFields: string[],
    private readonly options?: SortQueryPipeOption,
  ) {
    super();
  }

  async transform(value: any): Promise<EntitySortQueryDto | undefined> {
    const instance = await this.transformWithRequired(
      plainToInstance(EntitySortValidationQueryDto, value, {
        excludeExtraneousValues: true,
      }),
      this.options?.required,
    );

    if (!instance) {
      return undefined;
    }

    this.validateAllowField(instance.sort);

    const options = instance.sort.map((sort) => {
      const [field, order] = sort.split(':');
      return {
        field: field,
        order: this.convertToSortOrder(order),
      };
    });

    return plainToInstance(EntitySortQueryDto, {
      options,
    });
  }

  private convertToSortOrder(orderQuery: string): SortOrder {
    if (orderQuery === 'asc') {
      return 'ASC';
    }
    return 'DESC';
  }

  private isSortOrderQuery(order: string) {
    if (order === 'asc' || order === 'desc') {
      return true;
    }
    return false;
  }

  private validateAllowField(sorts: string[]) {
    const invalidFields: string[] = sorts.filter((sort) => {
      const [field, order] = sort.split(':');

      if (
        !this.allowedFields.includes(field) ||
        !this.isSortOrderQuery(order)
      ) {
        return true;
      }
      return false;
    });
    if (invalidFields.length > 0) {
      this.throwException(invalidFields);
    }
  }

  private throwException(invalidFields: string[]) {
    throw new InvalidInputException(
      invalidFields.map(
        (field) =>
          new InvalidInputError(field, {
            message: '올바르지 않은 정렬 옵션입니다.',
          }),
      ),
    );
  }
}
