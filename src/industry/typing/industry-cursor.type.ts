import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class IndustryCursor {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createDate?: Date;
}
