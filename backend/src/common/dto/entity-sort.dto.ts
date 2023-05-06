import { IsString } from 'class-validator';
import { TransformToArray } from '../decorator/transform-decorator/transform-to-array.decorator';
import { EntitySortOption } from '../interface/entity-sort.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EntitySortValidationQueryDto {
  @Expose()
  @IsString({
    each: true,
  })
  @TransformToArray()
  sort: string[];
}

export class EntitySortQueryDto {
  @ApiPropertyOptional({
    type: String,
    isArray: true,
    name: 'sort',
    description:
      '정렬을 적용할 필드와 정렬 방법입니다. 필드명:정렬방법(asc, desc)   ex) name:asc or name:desc',
  })
  options: EntitySortOption[];
}
