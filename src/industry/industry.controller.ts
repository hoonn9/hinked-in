import { UseController } from '../common/decorator/use-controller.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { IndustryDto } from './dto/industry.dto';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { QueryTransformPipe } from '../common/pipe/query-transform-pipe';
import { SortQueryPipe } from '../common/pipe/sort-query-pipe';
import { SearchQueryPipe } from '../common/pipe/search-query-pipe';
import { IndustryService } from './industry.service';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';

@ApiTags('industry')
@UseController('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @ApiOperation({
    description: '업계 리스트를 가져옵니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      type: [IndustryDto],
      generic: {
        type: PaginationResponseDto,
        field: 'list',
      },
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getIndustries(
    @Query(new QueryTransformPipe()) paginationQuery: PaginationQueryDto,
    @Query(new SortQueryPipe(['name', 'create_date']))
    sortQuery?: EntitySortQueryDto,
    @Query(new SearchQueryPipe(['name']))
    searchQuery?: EntitySearchQueryDto,
  ) {
    return this.industryService.getIndustries(
      paginationQuery,
      sortQuery,
      searchQuery,
    );
  }
}
