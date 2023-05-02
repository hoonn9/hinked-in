import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { TransformToArray } from '../decorator/transform-decorator/transform-to-array.decorator';

export class EntitySearchQueryDto {
  @ApiPropertyOptional({
    name: 'keyword',
    description: '검색할 키워드입니다.',
  })
  @Length(1, 256)
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiPropertyOptional({
    name: 'field',
    description: '검색할 필드명입니다.',
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  @TransformToArray()
  @IsOptional()
  field: string[];
}

export class EntitySearchRequiredQueryDto {
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
