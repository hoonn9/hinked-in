import { IsUUID } from 'class-validator';

export class GetMemberExperienceParamDto {
  @IsUUID('4')
  memberId: string;
}
