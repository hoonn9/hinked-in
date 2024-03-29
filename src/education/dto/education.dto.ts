import { Column } from 'typeorm';
import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiDateProperty } from '../../common/lib/swagger/decorator/api-date-property.decorator';
import { Type, plainToInstance } from 'class-transformer';
import { SchoolDto } from '../../school/dto/school.dto';
import { EducationEntity } from '../entity/education.entity';

export class EducationDto extends DateColumnDto {
  @ApiUUIDProperty({
    name: 'id',
  })
  @IsID()
  id: string;

  @ApiPropertyOptional({
    name: 'fieldOfStudy',
    type: String,
  })
  @IsOptional()
  @IsString()
  fieldOfStudy: string | null;

  @ApiPropertyOptional({
    name: 'degree',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', name: 'degree', nullable: true })
  degree: string | null;

  @ApiPropertyOptional({
    name: 'grade',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Column({ type: 'varchar', name: 'grade', nullable: true })
  grade: string | null;

  @ApiDateProperty({
    name: 'startDate',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate: Date | null;

  @ApiDateProperty({
    name: 'endDate',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date | null;

  @ApiPropertyOptional({
    name: 'school',
    type: SchoolDto,
  })
  @Type(() => SchoolDto)
  @IsOptional()
  school: SchoolDto | null;

  static fromEntity(entity: EducationEntity): EducationDto {
    const plain: EducationDto = {
      id: entity.id,
      fieldOfStudy: entity.fieldOfStudy,
      degree: entity.degree,
      grade: entity.grade,
      startDate: entity.startDate,
      endDate: entity.endDate,
      school: entity.school ? SchoolDto.fromEntity(entity.school) : null,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(EducationDto, plain);
  }
}
