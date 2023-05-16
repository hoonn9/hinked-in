import { Injectable } from '@nestjs/common';
import { EmploymentTypeQueryService } from '../employment-type/service/employment-type-query.service';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import { ExperienceEntity } from './entity/experience.entity';
import { EntityManager } from 'typeorm';
import { MemberEntity } from '../member/entity/member.entity';
import { CompanyQueryService } from '../company/service/company-query.service';
import { IndustryQueryService } from '../industry/service/industry-query.service';
import { ExperienceQueryService } from './service/experience-query.service';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly employmentTypeQueryService: EmploymentTypeQueryService,
    private readonly companyQueryService: CompanyQueryService,
    private readonly industryQueryService: IndustryQueryService,
    private readonly experienceQueryService: ExperienceQueryService,
  ) {}

  async getMemberExperiences(
    member: MemberEntity,
  ): Promise<ExperienceEntity[]> {
    return this.experienceQueryService.findByMemberId(member.id);
  }

  async addExperience(
    input: CreateExperienceBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ): Promise<void> {
    const employmentType =
      await this.employmentTypeQueryService.findOneByIdOrFail(
        input.employmentTypeId,
      );

    const company = await this.companyQueryService.findOneByIdOrFail(
      input.companyId,
    );

    const industry = await this.industryQueryService.findOneByIdOrFail(
      input.industryId,
    );

    const experience = ExperienceEntity.new({
      title: input.title,
      memberId: member.id,
      employmentTypeId: employmentType.id,
      companyId: company.id,
      location: input.location,
      industryId: industry.id,
      description: input.description,
      headline: input.headline,
      startDate: input.startDate,
      endDate: input.endDate,
    });

    await manager.save(experience);
  }
}
