import { PickType } from '@nestjs/swagger';
import { CompanyFollowDto } from './company-follow.dto';

export class AddCompanyFollowParamDto extends PickType(CompanyFollowDto, [
  'id',
]) {}
