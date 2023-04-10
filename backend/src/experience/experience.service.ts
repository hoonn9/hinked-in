import { Injectable } from '@nestjs/common';
import { EmploymentTypeQueryService } from '../employment-type/service/employment-type-query.service';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import { ExperienceEntity } from './entity/experience.entity';
import { EntityManager } from 'typeorm';
import { MemberEntity } from '../member/entity/member.entity';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly employmentTypeQueryService: EmploymentTypeQueryService,
  ) {}

  async addExperience(
    input: CreateExperienceBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ): Promise<void> {
    const employmentType =
      await this.employmentTypeQueryService.findOneByIdOrFail(
        input.employmentTypeId,
      );

    const experience = ExperienceEntity.new({
      title: input.title,
      memberId: member.id,
      employmentTypeId: employmentType.id,
      companyName: 'company',
      location: 'location',
      industry: 'industry',
      description: input.description,
      headline: input.headline,
      startDate: input.startDate,
      endDate: input.endDate,
    });

    await manager.save(experience);
  }
}
