import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CoreQueryService } from '../../common/service/core-query.service';
import { EntityNotExistException } from '../../common/exception/custom-excpetion/entity-not-exist-exception';
import { CompanyEntity } from '../entity/company.entity';

@Injectable()
export class CompanyQueryService extends CoreQueryService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {
    super(companyRepository);
  }

  async findOneByIdOrFail(id: string, manager?: EntityManager) {
    const company = await this.createQueryBuilder('company', manager)
      .where('id = :id', { id })
      .getOne();

    if (!company) {
      throw new EntityNotExistException('회사');
    }

    return company;
  }
}
