import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/exception-filter/http-exception-filter';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponseInterceptor } from '../common/interceptor/http-response.interceptor';
import { ExperienceService } from './experience.service';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';

@ApiTags('experience')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ description: '로그인된 멤버의 경력을 생성합니다.' })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '경력 생성에 성공했을 경우',
      description: '경력 생성에 성공했을 때의 응답입니다.',
      type: true,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 EmploymentTypeId으로 요청했을 경우',
      description:
        '존재하지 않는 EmploymentTypeId으로 요청했을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @TransactionRoute()
  @Post()
  async create(
    @TransactionContext() manager: TransactionManager,
    @CurrentUser() member: MemberEntity,
    @Body() body: CreateExperienceBodyDto,
  ): Promise<true> {
    await this.experienceService.addExperience(body, member, manager);
    return true;
  }
}
