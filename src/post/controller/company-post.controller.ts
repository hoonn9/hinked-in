import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { Body, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Auth } from '../../auth/decorator/auth.decorator';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { MemberEntity } from '../../member/entity/member.entity';
import { ApiHttpResponse } from '../../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { TransactionRoute } from '../../common/decorator/transaction-route.decorator';
import { TransactionContext } from '../../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../../common/type/transaction-manager.type';
import { CreateMemberPostBodyDto } from '../dto/create-member-post.dto';
import { CompanyPostService } from '../service/company-post.service';
import { CreateCompanyPostParamDto } from '../dto/create-company-post.dto';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';

@ApiTags('companies')
@UseController('companies')
export class CompanyPostController {
  constructor(private readonly companyPostService: CompanyPostService) {}

  @ApiOperation({
    description: '회사 게시글을 등록합니다.',
  })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '게시글 등록에 성공했을 경우',
      description: '게시글이 성공적으로 생성되었을 때의 응답입니다.',
      type: true,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @ApiHttpExceptionResponse(HttpStatus.UNAUTHORIZED, [
    {
      title: '멤버 인증 정보가 존재하지 않을 경우',
      description: '인증 정보가 존재하지 않거나 올바르지 않을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.LoginNeed,
    },
    {
      title: '회사에 대한 권한이 없는 인증일 경우',
      description: '인증 정보가 존재하지 않거나 올바르지 않을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.AccessDenied,
    },
  ])
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @TransactionRoute()
  @Post(':id/posts')
  async addCompanyPost(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() param: CreateCompanyPostParamDto,
    @Body() body: CreateMemberPostBodyDto,
  ): Promise<true> {
    await this.companyPostService.addCompanyPost(
      param.id,
      body,
      member,
      manager,
    );
    return true;
  }
}
