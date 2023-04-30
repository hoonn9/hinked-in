import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpResponseInterceptor } from '../common/interceptor/http-response.interceptor';
import { HttpExceptionFilter } from '../common/exception/exception-filter/http-exception-filter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmploymentTypeDto } from './dto/employment-type.dto';
import { EmploymentTypeService } from './employment-type.service';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';

@ApiTags('employment-type')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('employment-type')
export class EmploymentTypeController {
  constructor(private readonly employmentTypeService: EmploymentTypeService) {}

  @ApiOperation({ description: '고용 타입을 가져옵니다.' })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      type: [EmploymentTypeDto],
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Get()
  async getEmploymentTypes(): Promise<EmploymentTypeDto[]> {
    return this.employmentTypeService.getEmploymentTypes();
  }
}
