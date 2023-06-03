import { PickType } from '@nestjs/swagger';
import { CompanyFollowDto } from './company-follow.dto';

export class TriggerCompanyFollowParamDto extends PickType(CompanyFollowDto, [
  'id',
]) {}
