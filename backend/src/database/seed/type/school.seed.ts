import { IsString } from 'class-validator';

export class SchoolSeed {
  @IsString()
  name: string;
}
