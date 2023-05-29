import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEntity } from '../entity/education.entity';
import { EntityManager, Repository } from 'typeorm';
import { MemberEntity } from '../../member/entity/member.entity';
import { CoreQueryService } from '../../common/service/core-query.service';

@Injectable()
export class EducationQueryService extends CoreQueryService<EducationEntity> {
  constructor(
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
  ) {
    super(educationRepository);
  }

  async findByMember(
    member: MemberEntity,
    manager?: EntityManager,
  ): Promise<EducationEntity[]> {
    return this.createQueryBuilder('education', manager)
      .innerJoinAndSelect('education.school', 'school')
      .where('education.member_id = :memberId', { memberId: member.id })
      .getMany();
  }
}
