import { Injectable } from '@nestjs/common';
import { CreateEducationBodyDto } from './dto/create-education.dto';
import { MemberEntity } from '../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { EducationEntity } from './entity/education.entity';
import { EducationDto } from './dto/education.dto';
import { EducationRepository } from './education.repository';
import { SchoolRepository } from '../school/school.repository';

@Injectable()
export class EducationService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly educationRepository: EducationRepository,
  ) {}

  async createEducation(
    member: MemberEntity,
    body: CreateEducationBodyDto,
    manager: EntityManager,
  ) {
    const school = await this.schoolRepository.findOneByIdOrFail(
      body.schoolId,
      manager,
    );

    await this.educationRepository.createEducation(
      EducationEntity.new({
        degree: body.degree,
        grade: body.grade,
        startDate: body.startDate,
        endDate: body.endDate,
        fieldOfStudy: body.fieldOfStudy,
        school,
        member,
      }),
      manager,
    );
  }

  async getMemberEducations(
    member: MemberEntity,
    manager?: EntityManager,
  ): Promise<EducationDto[]> {
    const entities = await this.educationRepository.findByMember(
      member,
      manager,
    );

    return entities.map(EducationDto.fromEntity);
  }
}
