import { OmitType } from '@nestjs/swagger';
import { CreateMemberBodyDto } from './create-member-body.dto';

export class UpdateMemberDto extends OmitType(CreateMemberBodyDto, [
  'email',
  'password',
]) {}
