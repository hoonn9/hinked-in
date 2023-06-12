import { PickType } from '@nestjs/swagger';
import { CompanyFollowDto } from './company-follow.dto';

export class RemoveCompanyFollowParamDto extends PickType(CompanyFollowDto, [
  'id',
]) {}
