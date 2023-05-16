import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { ApiDateProperty } from '../../common/lib/swagger/decorator/api-date-property.decorator';
import { ExperienceEntity } from '../entity/experience.entity';
import { EmploymentTypeDto } from '../../employment-type/dto/employment-type.dto';
import { Type, plainToInstance } from 'class-transformer';
import { IndustryDto } from '../../industry/dto/industry.dto';
import { CompanyDto } from '../../company/dto/company.dto';
import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ExperienceDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsID()
  id: string;

  @ApiProperty({
    name: 'title',
    type: String,
  })
  @IsString()
  title: string;

  @ApiUUIDProperty({
    name: 'employmentTypeId',
  })
  @IsID()
  employmentTypeId: string;

  @ApiPropertyOptional({
    name: 'employmentType',
    type: EmploymentTypeDto,
  })
  @Type(() => EmploymentTypeDto)
  employmentType: EmploymentTypeDto | null;

  @ApiUUIDProperty({
    name: 'companyId',
  })
  @IsID()
  companyId: string;

  @ApiPropertyOptional({
    name: 'company',
    type: CompanyDto,
  })
  @Type(() => CompanyDto)
  company: CompanyDto | null;

  @ApiProperty({
    name: 'location',
    type: String,
  })
  @IsString()
  location: string;

  @ApiUUIDProperty({
    name: 'industryId',
  })
  @IsID()
  industryId: string;

  @ApiPropertyOptional({
    name: 'industry',
    type: IndustryDto,
  })
  @Type(() => IndustryDto)
  industry: IndustryDto | null;

  @ApiPropertyOptional({
    name: 'description',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({
    name: 'headline',
    type: String,
  })
  @IsString()
  headline: string;

  @ApiDateProperty({
    name: 'startDate',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiDateProperty({
    name: 'endDate',
    isOptional: true,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date | null;

  @ApiUUIDProperty({
    name: 'memberId',
  })
  @IsID()
  memberId: string;

  static fromEntity(entity: ExperienceEntity) {
    const plain: ExperienceDto = {
      id: entity.id,
      title: entity.title,
      employmentTypeId: entity.employmentTypeId,
      employmentType: entity.employmentType
        ? EmploymentTypeDto.fromEntity(entity.employmentType)
        : null,
      companyId: entity.companyId,
      company: entity.company ? CompanyDto.fromEntity(entity.company) : null,
      location: entity.location,
      industryId: entity.industryId,
      industry: entity.industry
        ? IndustryDto.fromEntity(entity.industry)
        : null,
      description: entity.description,
      headline: entity.headline,
      startDate: entity.startDate,
      endDate: entity.endDate,
      memberId: entity.memberId,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(ExperienceDto, plain);
  }
}
