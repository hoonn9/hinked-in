import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HttpExceptionResponseDto {
  @ApiProperty({
    name: 'code',
    type: String,
    description: '예외를 식별하는 코드입니다.',
  })
  @IsString()
  code: string;

  @ApiProperty({
    name: 'message',
    type: String,
    description: '예외의 대한 설명입니다.',
  })
  @IsString()
  message: string;

  @Exclude()
  @IsDateString()
  timestamp: string;

  @Exclude()
  @IsString()
  path: string;

  @ApiPropertyOptional({ type: [] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Error)
  errors?: Error[];
}
