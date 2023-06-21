import { IsBoolean, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { CompanyDto } from './company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '../entity/company.entity';
import { Type, plainToInstance } from 'class-transformer';

export class GetCompanyDto {
  @ApiProperty({
    name: 'company',
    type: CompanyDto,
  })
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ApiProperty({
    name: 'followCount',
    type: Number,
  })
  @Min(0)
  @IsInt()
  followCount: number;

  @ApiProperty({
    name: 'isFollowing',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isFollowing?: boolean;

  static fromEntity(
    entity: CompanyEntity,
    properties: Omit<GetCompanyDto, 'company'>,
  ) {
    const plain: GetCompanyDto = {
      company: CompanyDto.fromEntity(entity),
      followCount: properties.followCount,
      isFollowing: properties.isFollowing,
    };

    return plainToInstance(GetCompanyDto, plain);
  }
}

export class GetCompanyParamDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;
}
