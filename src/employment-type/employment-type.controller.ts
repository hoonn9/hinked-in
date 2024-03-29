import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmploymentTypeDto } from './dto/employment-type.dto';
import { EmploymentTypeService } from './employment-type.service';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';
import { SearchQueryPipe } from '../common/pipe/search-query-pipe';
import { UseController } from '../common/decorator/use-controller.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { SortQueryPipe } from '../common/pipe/sort-query-pipe';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { QueryTransformPipe } from '../common/pipe/query-transform-pipe';

@ApiTags('employment-types')
@UseController('employment-types')
export class EmploymentTypeController {
  constructor(private readonly employmentTypeService: EmploymentTypeService) {}

  @ApiOperation({ description: '고용 타입을 가져옵니다.' })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      type: [EmploymentTypeDto],
      generic: { type: PaginationResponseDto, field: 'list' },
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getEmploymentTypes(
    @Query(new QueryTransformPipe()) paginationQuery: PaginationQueryDto,
    @Query(new SortQueryPipe(['name', 'create_date']))
    sortQuery?: EntitySortQueryDto,
    @Query(new SearchQueryPipe(['name']))
    searchQuery?: EntitySearchQueryDto,
  ): Promise<PaginationResponseDto<EmploymentTypeDto>> {
    return this.employmentTypeService.getEmploymentTypes(
      paginationQuery,
      sortQuery,
      searchQuery,
    );
  }
}
