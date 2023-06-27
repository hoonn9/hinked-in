import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemberDto } from '../../member/dto/member.dto';
import { CompanyDto } from '../../company/dto/company.dto';
import { Type, plainToInstance } from 'class-transformer';
import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { FollowEntity } from '../entity/follow.entity';
import { CompanyEntity } from '../../company/entity/company.entity';

export class CompanyFollowDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    name: 'member',
    type: MemberDto,
  })
  @Type(() => MemberDto)
  follower: MemberDto;

  @ApiProperty({
    name: 'company',
    type: CompanyDto,
  })
  @Type(() => CompanyDto)
  following: CompanyDto;

  static fromEntity(entity: FollowEntity, company: CompanyEntity) {
    const plain: CompanyFollowDto = {
      id: entity.id,
      follower: MemberDto.fromEntity(entity.follower),
      following: CompanyDto.fromEntity(company),
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(CompanyFollowDto, plain);
  }
}
