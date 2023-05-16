import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ExperienceEntity } from '../entity/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreQueryService } from '../../common/service/core-query.service';

@Injectable()
export class ExperienceQueryService extends CoreQueryService<ExperienceEntity> {
  constructor(
    @InjectRepository(ExperienceEntity)
    readonly experienceRepository: Repository<ExperienceEntity>,
  ) {
    super(experienceRepository);
  }

  async findByMemberId(memberId: string, em?: EntityManager) {
    return this.createQueryBuilder('experience', em)
      .where('experience.memberId = :memberId', { memberId: memberId })
      .getMany();
  }
}
