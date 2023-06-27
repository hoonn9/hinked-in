import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { Get, HttpStatus, Param } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CompanyService } from './company.service';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { GetCompanyDto, GetCompanyParamDto } from './dto/get-company.dto';

@ApiTags('companies')
@UseController('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    description: '회사 정보를 가져옵니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      description: '성공적으로 회사 정보를 가져왔을 떄의 응답입니다.',
      type: GetCompanyDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 회사일 경우',
      description: '존재하지 않는 회사에 대한 요청일 때 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @Auth('USER')
  @TransactionRoute()
  @Get(':id')
  async getCompany(
    @TransactionContext() manager: TransactionManager,
    @CurrentUser()
    member: MemberEntity | null,
    @Param() param: GetCompanyParamDto,
  ): Promise<GetCompanyDto> {
    return await this.companyService.getCompany(param, member, manager);
  }
}
