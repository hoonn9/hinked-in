import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';
import { TransformToArray } from '../decorator/transform-decorator/transform-to-array.decorator';

export class EntitySearchQueryDto {
  @ApiProperty({
    name: 'keyword',
    description: '검색할 키워드입니다.',
  })
  @Length(1, 256)
  @IsString()
  keyword: string;

  @ApiProperty({
    name: 'field',
    description: '검색할 필드명입니다.',
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  @TransformToArray()
  field: string[];
}
