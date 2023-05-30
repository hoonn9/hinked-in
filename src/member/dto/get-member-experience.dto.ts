import { PickType } from '@nestjs/swagger';
import { MemberDto } from './member.dto';

export class GetMemberExperienceParamDto extends PickType(MemberDto, ['id']) {}
