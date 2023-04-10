import { OmitType } from '@nestjs/swagger';
import { CreateMemberBodyDto } from './create-member.dto';

export class UpdateMemberBodyDto extends OmitType(CreateMemberBodyDto, [
  'email',
  'password',
]) {}
