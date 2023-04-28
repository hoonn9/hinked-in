import { Injectable } from '@nestjs/common';
import { CoreQueryService } from '../../common/service/core-query.service';
import { IndustryEntity } from '../entity/industry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';

@Injectable()
export class IndustryQueryService extends CoreQueryService<IndustryEntity> {
  constructor(
    @InjectRepository(IndustryEntity)
    private readonly industryRepository: Repository<IndustryEntity>,
  ) {
    super(industryRepository);
  }

  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const industry = await this.createQueryBuilder('industry', manager)
      .where('id = :id', { id })
      .getOne();

    if (!industry) {
      throw new EntityNotExistException('업계');
    }

    return industry;
  }
}
