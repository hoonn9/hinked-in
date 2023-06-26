import { PickType } from '@nestjs/swagger';
import { MemberFollowDto } from './member-follow.dto';

export class RemoveMemberFollowParamDto extends PickType(MemberFollowDto, [
  'id',
]) {}
