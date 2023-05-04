import { IsString } from 'class-validator';
import { TransformToArray } from '../decorator/transform-decorator/transform-to-array.decorator';
import { EntitySortOption } from '../interface/entity-sort.interface';

export class EntitySortValidationQueryDto {
  @IsString({
    each: true,
  })
  @TransformToArray()
  sort: string[];
}

export class EntitySortQueryDto {
  options: EntitySortOption[];
}
