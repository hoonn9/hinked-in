import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { ApiHttpResponse } from '../../common/lib/swagger/decorator/api-http-response.decorator';
import { Delete, HttpStatus, Param, Post } from '@nestjs/common';
import { MemberFollowDto } from '../dto/member-follow.dto';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { Auth } from '../../auth/decorator/auth.decorator';
import { TransactionRoute } from '../../common/decorator/transaction-route.decorator';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { MemberEntity } from '../../member/entity/member.entity';
import { TransactionContext } from '../../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../../common/type/transaction-manager.type';
import { AddMemberFollowParamDto } from '../dto/add-member-follow.dto';
import { MemberFollowService } from '../service/member-follow.service';
import { RemoveMemberFollowParamDto } from '../dto/remove-member-follow.dto';

@ApiTags('members')
@UseController('members')
export class MemberFollowController {
  constructor(private readonly memberFollowService: MemberFollowService) {}

  @ApiOperation({
    description: '멤버를 팔로우합니다.',
  })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '요청에 성공했을 경우',
      description: '멤버 팔로우 생성에 성공했을 때의 응답입니다.',
      type: MemberFollowDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 멤버에 대한 요청일 경우',
      description: '존재하지 않는 멤버의 ID일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.CONFLICT, [
    {
      title: '이미 팔로우하는 멤버에 대한 요청일 경우',
      description:
        '이미 팔로우한 멤버에 대해 생성 요청을 했을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.AlreadyExists,
    },
  ])
  @Auth()
  @TransactionRoute()
  @Post(':id/follows')
  async addMemberFollow(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() params: AddMemberFollowParamDto,
  ): Promise<MemberFollowDto> {
    return await this.memberFollowService.addMemberFollow(
      member,
      params.id,
      manager,
    );
  }

  @ApiOperation({
    description: '멤버를 언팔로우합니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      description: '멤버 팔로우 삭제에 성공했을 때의 응답입니다.',
      type: MemberFollowDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '팔로우하지 않는 멤버에 대한 요청일 경우',
      description: '팔로우하고 있지 않은 멤버에 대한 요청일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
    {
      title: '존재하지 않는 멤버에 대한 요청일 경우',
      description: '존재하지 않는 멤버의 ID일 경우의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @Auth()
  @TransactionRoute()
  @Delete(':id/follows')
  async removeMemberFollow(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Param() params: RemoveMemberFollowParamDto,
  ): Promise<MemberFollowDto> {
    return await this.memberFollowService.removeMemberFollow(
      member,
      params.id,
      manager,
    );
  }
}
