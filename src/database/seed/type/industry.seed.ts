import { IsString } from 'class-validator';

export class IndustrySeed {
  @IsString()
  name: string;
}
