import { Injectable } from '@nestjs/common';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EntityManager } from 'typeorm';
import { CreateEmploymentTypeDto } from './dto/create-employment-type.dto';
import { EmploymentTypeQueryService } from './service/employment-type-query.service';
import { AlreadyExistError } from '../common/error/already-exist.error';
import { EmploymentTypeDto } from './dto/employment-type.dto';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';

@Injectable()
export class EmploymentTypeService {
  constructor(
    private readonly employmentTypeQueryService: EmploymentTypeQueryService,
  ) {}

  async getEmploymentTypes(
    paginationQuery: PaginationQueryDto,
    sortQuery?: EntitySortQueryDto,
    searchQuery?: EntitySearchQueryDto,
  ): Promise<PaginationResponseDto<EmploymentTypeDto>> {
    const paginationResult = await this.employmentTypeQueryService.findMany(
      paginationQuery,
      searchQuery,
      sortQuery?.options,
    );
    return {
      list: paginationResult.list.map(EmploymentTypeDto.fromEntity),
      metadata: { nextCursor: paginationResult.nextCursor },
    };
  }

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
