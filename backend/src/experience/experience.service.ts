import { Injectable } from '@nestjs/common';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import { ExperienceEntity } from './entity/experience.entity';
import { EntityManager } from 'typeorm';
import { MemberEntity } from '../member/entity/member.entity';
import { ExperienceDto } from './dto/experience.dto';
import { CompanyRepository } from '../company/company.repository';
import { EmploymentTypeRepository } from '../employment-type/employment-type.repository';
import { ExperienceRepository } from './experience.repository';
import { IndustryRepository } from '../industry/industry.repository';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly employmentTypeRepository: EmploymentTypeRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly industryRepository: IndustryRepository,
    private readonly experienceRepository: ExperienceRepository,
  ) {}

  async getMemberExperiences(member: MemberEntity): Promise<ExperienceDto[]> {
    const experiences = await this.experienceRepository.findByMember(member);
    return experiences.map(ExperienceDto.fromEntity);
  }

  async addExperience(
    input: CreateExperienceBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ): Promise<void> {
    const employmentType =
      await this.employmentTypeRepository.findOneByIdOrFail(
        input.employmentTypeId,
      );

    const company = await this.companyRepository.findOneByIdOrFail(
      input.companyId,
    );

    const industry = await this.industryRepository.findOneByIdOrFail(
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
