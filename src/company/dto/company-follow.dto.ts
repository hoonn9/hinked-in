import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemberDto } from '../../member/dto/member.dto';
import { CompanyDto } from './company.dto';
import { Type, plainToInstance } from 'class-transformer';
import { CompanyFollowEntity } from '../entity/company-follow.entity';
import { DateColumnDto } from '../../common/dto/date-columns.dto';

export class CompanyFollowDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    name: 'member',
    type: MemberDto,
  })
  @IsOptional()
  @Type(() => MemberDto)
  member?: MemberDto;

  @ApiProperty({
    name: 'company',
    type: CompanyDto,
  })
  @Type(() => CompanyDto)
  company: CompanyDto;

  static fromEntity(entity: CompanyFollowEntity) {
    const plain: CompanyFollowDto = {
      id: entity.id,
      company: CompanyDto.fromEntity(entity.company),
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(CompanyFollowDto, plain);
  }
}
