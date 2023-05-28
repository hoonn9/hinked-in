import { Injectable } from '@nestjs/common';
import { CreateEducationBodyDto } from './dto/create-education.dto';
import { MemberEntity } from '../member/entity/member.entity';
import { EntityManager } from 'typeorm';
import { EducationEntity } from './entity/education.entity';
import { SchoolQueryService } from '../school/service/school-query.service';

@Injectable()
export class EducationService {
  constructor(private readonly schoolQueryService: SchoolQueryService) {}

  async createEducation(
    member: MemberEntity,
    body: CreateEducationBodyDto,
    manager: EntityManager,
  ) {
    const school = await this.schoolQueryService.findOneByIdOrFail(
      body.schoolId,
      manager,
    );

    const education = EducationEntity.new({
      degree: body.degree,
      grade: body.grade,
      startDate: body.startDate,
      endDate: body.endDate,
      fieldOfStudy: body.fieldOfStudy,
      school,
      member,
    });

    await manager.save(education);
  }
}
