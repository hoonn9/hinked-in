import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';
import { UseController } from '../common/decorator/use-controller.decorator';

@ApiTags('experiences')
@UseController('experiences')
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
      title: 'EmploymentTypeId, CompanyId, IndustryId 중 존재하지 않을 경우',
      description: '존재하지 않는 ID를 포함하여 요청했을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @TransactionRoute()
  @Post()
  async addExperience(
    @TransactionContext() manager: TransactionManager,
    @CurrentUser() member: MemberEntity,
    @Body() body: CreateExperienceBodyDto,
  ): Promise<true> {
    await this.experienceService.addExperience(body, member, manager);
    return true;
  }
}
