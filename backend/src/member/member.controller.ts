import {
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberBodyDto } from './dto/create-member.dto';
import { UpdateMemberBodyDto } from './dto/update-member.dto';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from './entity/member.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../common/exception/constant';
import { FieldError } from '../common/error/field.error';
import { ApiCommandHttpResponse } from '../common/lib/swagger/decorator/api-http-command-response.decorator';
import { UseController } from '../common/decorator/use-controller.decorator';
import { GetMeMemberDto } from './dto/get-me-member.dto';

@ApiTags('member')
@UseController('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ description: '로그인된 멤버의 정보를 가져옵니다' })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '로그인된 멤버 정보 조회에 성공한 경우',
      description: '로그인된 멤버 정보 조회에 성공했을 때의 응답입니다.',
      type: GetMeMemberDto,
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('me')
  async me(@CurrentUser() member: MemberEntity): Promise<GetMeMemberDto> {
    return GetMeMemberDto.fromEntity(member);
  }

  @ApiOperation({
    description: '새로운 멤버를 생성합니다.',
  })
  @ApiCommandHttpResponse(HttpStatus.CREATED)
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST, [
    {
      title: '이미 사용 중인 이메일로 요청했을 경우',
      type: FieldError,
    },
  ])
  @HttpCode(HttpStatus.CREATED)
  @TransactionRoute()
  @Post()
  async addMember(
    @Body() createMemberBodyDto: CreateMemberBodyDto,
    @TransactionContext() manager: TransactionManager,
  ): Promise<true> {
    await this.memberService.addMember(createMemberBodyDto, manager);
    return true;
  }

  @ApiOperation({
    description: '로그인된 멤버 정보를 수정합니다.',
  })
  @ApiCommandHttpResponse()
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 사용자의 인증 정보로 요청했을 경우',
      response: EXCEPTION_RESPONSE.MemberNotExist,
    },
  ])
  @HttpCode(HttpStatus.OK)
  @TransactionRoute()
  @Auth()
  @Patch()
  async updateMember(
    @CurrentUser() member: MemberEntity,
    @Body() updateMemberDto: UpdateMemberBodyDto,
    @TransactionContext() manager: TransactionManager,
  ): Promise<true> {
    await this.memberService.update(member.id, updateMemberDto, manager);
    return true;
  }

  @ApiOperation({
    description: '로그인된 멤버 계정을 삭제합니다.',
  })
  @ApiCommandHttpResponse()
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '존재하지 않는 사용자의 인증 정보로 요청했을 경우',
      response: EXCEPTION_RESPONSE.MemberNotExist,
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Auth()
  @TransactionRoute()
  @Delete()
  async removeMember(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
  ): Promise<true> {
    await this.memberService.remove(member.id, manager);
    return true;
  }
}
