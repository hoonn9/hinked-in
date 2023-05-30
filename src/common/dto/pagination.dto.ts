import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    name: 'limit',
    type: Number,
    description: '받아올 리스트의 개수입니다. (1~100)',
  })
  @Expose()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({
    name: 'cursor',
    type: String,
    description:
      '페이지네이션 커서이며 Base64로 인코딩되어 있습니다. 입력하지 않을 경우 첫 데이터부터 가져옵니다.',
  })
  @Expose()
  @IsString()
  @IsOptional()
  cursor?: string;
}

export class PaginationMetadataDto {
  @ApiPropertyOptional({
    name: 'nextCursor',
    type: String,
    nullable: true,
  })
  nextCursor: string | null;
}

export class PaginationResponseDto<T> {
  @ApiProperty({
    name: 'list',
    isArray: true,
    type: 'generic',
  })
  list: T[];

  @ApiProperty({ type: PaginationMetadataDto })
  metadata: PaginationMetadataDto;
}
