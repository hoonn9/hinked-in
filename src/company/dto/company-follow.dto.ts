import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberDto } from '../../member/dto/member.dto';
import { CompanyDto } from './company.dto';
import { Type } from 'class-transformer';

export class CompanyFollowDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;

  @ApiProperty({
    name: 'member',
    type: MemberDto,
  })
  @Type(() => MemberDto)
  member: MemberDto;

  @ApiProperty({
    name: 'company',
    type: CompanyDto,
  })
  @Type(() => CompanyDto)
  company: CompanyDto;
}
