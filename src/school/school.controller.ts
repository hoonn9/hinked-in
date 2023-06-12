import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { SchoolService } from './school.service';
import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { SchoolDto } from './dto/school.dto';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { QueryTransformPipe } from '../common/pipe/query-transform-pipe';
import { SortQueryPipe } from '../common/pipe/sort-query-pipe';
import { SearchQueryPipe } from '../common/pipe/search-query-pipe';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';

@ApiTags('schools')
@UseController('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({ description: '학교 리스트를 가져옵니다.' })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      type: [SchoolDto],
      generic: { type: PaginationResponseDto, field: 'list' },
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getSchools(
    @Query(new QueryTransformPipe()) paginationQuery: PaginationQueryDto,
    @Query(new SortQueryPipe(['name']))
    sortQuery?: EntitySortQueryDto,
    @Query(new SearchQueryPipe(['name']))
    searchQuery?: EntitySearchQueryDto,
  ): Promise<PaginationResponseDto<SchoolDto>> {
    return this.schoolService.getSchools(
      paginationQuery,
      sortQuery,
      searchQuery,
    );
  }
}
