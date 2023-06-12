import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { Delete, HttpStatus, Param, Post } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CompanyService } from './company.service';
import { AddCompanyFollowParamDto } from './dto/add-company-follow.dto';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { CompanyFollowDto } from './dto/company-follow.dto';
import { RemoveCompanyFollowParamDto } from './dto/remove-company-follow.dto';

@ApiTags('companies')
@UseController('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    description: '회사를 팔로우합니다.',
  })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '요청에 성공했을 경우',
      description: '회사 팔로우 생성에 성공했을 때의 응답입니다.',
      type: CompanyFollowDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 회사에 대한 요청일 경우',
      description: '존재하지 않는 회사의 ID일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.CONFLICT, [
    {
      title: '이미 팔로우하는 회사에 대한 요청일 경우',
      description:
        '이미 팔로우한 회사에 대해 생성 요청을 했을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.AlreadyExists,
    },
  ])
  @Auth()
  @TransactionRoute()
  @Post(':id/follows')
  async addCompanyFollow(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() params: AddCompanyFollowParamDto,
  ): Promise<CompanyFollowDto> {
    return await this.companyService.addCompanyFollow(
      member,
      params.id,
      manager,
    );
  }

  @ApiOperation({
    description: '회사를 언팔로우합니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      description: '회사 팔로우 삭제에 성공했을 때의 응답입니다.',
      type: CompanyFollowDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '팔로우하지 않는 회사에 대한 요청일 경우',
      description: '팔로우하고 있지 않은 회사에 대한 요청일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
    {
      title: '존재하지 않는 회사에 대한 요청일 경우',
      description: '존재하지 않는 회사의 ID일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @Auth()
  @TransactionRoute()
  @Delete(':id/follows')
  async removeCompanyFollow(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() params: RemoveCompanyFollowParamDto,
  ): Promise<CompanyFollowDto> {
    return this.companyService.removeCompanyFollow(member, params.id, manager);
  }
}
