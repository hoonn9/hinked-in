import { Injectable } from '@nestjs/common';
import { IndustryPaginationService } from './service/industry.pagination.service';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { IndustryDto } from './dto/industry.dto';

@Injectable()
export class IndustryService {
  constructor(
    private readonly industryPaginationService: IndustryPaginationService,
  ) {}

  async getIndustries(
    paginationQuery: PaginationQueryDto,
    sortQuery?: EntitySortQueryDto,
    searchQuery?: EntitySearchQueryDto,
  ) {
    const paginationResult = await this.industryPaginationService.findMany(
      paginationQuery,
      searchQuery,
      sortQuery?.options,
    );

    return {
      list: paginationResult.list.map(IndustryDto.fromEntity),
      metadata: { nextCursor: paginationResult.nextCursor },
    };
  }
}
