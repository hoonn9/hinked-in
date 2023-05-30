import { IsString } from 'class-validator';

export class CreateEmploymentTypeDto {
  @IsString()
  name: string;
}
