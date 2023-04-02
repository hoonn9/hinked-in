import { IsString } from 'class-validator';

export class EmploymentTypeSeed {
  @IsString()
  name: string;
}
