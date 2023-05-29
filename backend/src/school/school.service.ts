import { Injectable } from '@nestjs/common';
import { SchoolPaginationService } from './service/school.pagination.service';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';
import { SchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private readonly schoolQueryService: SchoolPaginationService) {}

  async getSchools(
    paginationQuery: PaginationQueryDto,
    sortQuery?: EntitySortQueryDto,
    searchQuery?: EntitySearchQueryDto,
  ): Promise<PaginationResponseDto<SchoolDto>> {
    const paginationResult = await this.schoolQueryService.findMany(
      paginationQuery,
      searchQuery,
      sortQuery?.options,
    );
    return {
      list: paginationResult.list.map(SchoolDto.fromEntity),
      metadata: { nextCursor: paginationResult.nextCursor },
    };
  }
}
