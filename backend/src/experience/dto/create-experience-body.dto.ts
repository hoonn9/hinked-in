import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiUUIDProperty } from '../../common/lib/swagger/api-uuid-property.decorator';
import { Type } from 'class-transformer';
import { ApiDateProperty } from '../../common/lib/swagger/api-date-property.decorator';

export class CreateExperienceBodyDto {
  @ApiProperty({
    name: 'title',
  })
  @IsString()
  title: string;

  @ApiUUIDProperty()
  @IsID()
  employmentTypeId: string;

  @ApiProperty({
    name: 'description',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({
    name: 'headline',
  })
  @IsString()
  headline: string;

  @ApiDateProperty({
    name: 'startDate',
  })
  @IsDateString()
  @Type(() => Date)
  startDate: Date;

  @ApiDateProperty({
    name: 'endDate',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate: Date | null;
}
