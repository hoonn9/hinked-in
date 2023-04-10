import { PickType } from '@nestjs/swagger';
import { ExperienceEntity } from '../entity/experience.entity';

export class CreateExperienceBodyDto extends PickType(ExperienceEntity, [
  'title',
  'description',
  'headline',
  'employmentTypeId',
  'startDate',
  'endDate',
]) {}
