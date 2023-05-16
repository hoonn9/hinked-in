import { PickType } from '@nestjs/swagger';
import { ExperienceDto } from './experience.dto';

export class CreateExperienceBodyDto extends PickType(ExperienceDto, [
  'title',
  'description',
  'headline',
  'employmentTypeId',
  'companyId',
  'industryId',
  'location',
  'startDate',
  'endDate',
]) {}
