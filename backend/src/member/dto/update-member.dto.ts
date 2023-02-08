import { PartialType } from '@nestjs/swagger';
import { CreateMemberBodyDto } from './create-member-body.dto';

export class UpdateMemberDto extends PartialType(CreateMemberBodyDto) {}
