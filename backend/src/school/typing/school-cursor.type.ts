import { IsOptional, IsString } from 'class-validator';

export class SchoolCursor {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;
}
