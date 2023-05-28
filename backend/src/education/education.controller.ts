import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { EducationService } from './education.service';
import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateEducationBodyDto } from './dto/create-education.dto';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { Auth } from '../auth/decorator/auth.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';

@ApiTags('education')
@UseController('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ description: '학력을 생성합니다.' })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '요청에 성공했을 경우',
      description: '성공적으로 학력을 생성했을 때의 응답입니다.',
      type: true,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @TransactionRoute()
  @Post()
  async createEducation(
    @TransactionContext() manager: TransactionManager,
    @CurrentUser() member: MemberEntity,
    @Body() body: CreateEducationBodyDto,
  ): Promise<true> {
    await this.educationService.createEducation(member, body, manager);
    return true;
  }
}
