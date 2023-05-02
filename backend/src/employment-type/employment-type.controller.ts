import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmploymentTypeDto } from './dto/employment-type.dto';
import { EmploymentTypeService } from './employment-type.service';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { EntitySearchQueryDto } from '../common/dto/entity-search.dto';
import { SearchQueryPipe } from '../common/decorator/search-query.decorator';
import { UseController } from '../common/decorator/use-controller.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';

@ApiTags('employment-type')
@UseController('employment-type')
export class EmploymentTypeController {
  constructor(private readonly employmentTypeService: EmploymentTypeService) {}

  @ApiOperation({ description: '고용 타입을 가져옵니다.' })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      type: [EmploymentTypeDto],
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getEmploymentTypes(
    @Query(new SearchQueryPipe(['name']))
    searchQuery?: EntitySearchQueryDto,
  ): Promise<EmploymentTypeDto[]> {
    return this.employmentTypeService.getEmploymentTypes(searchQuery);
  }
}
