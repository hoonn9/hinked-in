import { PickType } from '@nestjs/swagger';
import { MemberFollowDto } from './member-follow.dto';

export class AddMemberFollowParamDto extends PickType(MemberFollowDto, [
  'id',
]) {}
