import { Injectable } from '@nestjs/common';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EntityManager } from 'typeorm';
import { CreateEmploymentTypeDto } from './dto/create-employment-type.dto';
import { EmploymentTypeQueryService } from './service/employment-type-query.service';
import { AlreadyExistError } from '../common/error/already-exist.error';

@Injectable()
export class EmploymentTypeService {
  constructor(
    private readonly employmentTypeQueryService: EmploymentTypeQueryService,
  ) {}

  async addEmploymentType(
    dto: CreateEmploymentTypeDto,
    manager: EntityManager,
  ) {
    if (
      await this.employmentTypeQueryService.isExistingName(dto.name, manager)
    ) {
      throw new AlreadyExistError(EmploymentTypeEntity, 'name');
    }

    const employmentType = EmploymentTypeEntity.new({
      name: dto.name,
    });

    await manager.save(employmentType);
  }
}