import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { HttpStatus, Param, Post } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CompanyService } from './company.service';
import { TriggerCompanyFollowParamDto } from './dto/trigger-company-follow.dto';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';

@ApiTags('company')
@UseController('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    description: '회사를 팔로우 또는 언팔로우합니다.',
  })
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 회사에 대한 요청일 경우',
      description: '존재하지 않는 회사의 ID일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @Auth()
  @TransactionRoute()
  @Post(':id/follow')
  async triggerCompanyFollow(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() params: TriggerCompanyFollowParamDto,
  ): Promise<true> {
    await this.companyService.triggerCompanyFollow(member, params.id, manager);
    return true;
  }
}
