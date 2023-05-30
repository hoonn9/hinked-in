import { HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from '../dto/auth-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';
import { AuthJwtCookieService } from '../../jwt/service/auth-jwt-cookie.service';
import { ApiHttpExceptionResponse } from '../../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../../../common/exception/constant';
import { ApiHttpResponse } from '../../../common/lib/swagger/decorator/api-http-response.decorator';
import { UseController } from '../../../common/decorator/use-controller.decorator';

@ApiTags('auth')
@UseController('auth')
export class AuthLocalController {
  constructor(private readonly authJwtCookieService: AuthJwtCookieService) {}

  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '로그인에 성공했을 경우',
      description: '로그인 성공했을 때의 응답입니다.',
      type: true,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @ApiHttpExceptionResponse(HttpStatus.UNAUTHORIZED, [
    {
      title: '존재하지 않는 사용자 정보일 경우',
      description: '존재허지 않는 사용자의 정보를 입력했을 때 응답입니다.',
      response: EXCEPTION_RESPONSE.LoginFail,
    },
  ])
  @ApiImplicitBody({
    name: 'body',
    type: AuthLocalBodyDto,
    content: {},
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @CurrentUser() member: MemberEntity,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    this.authJwtCookieService.login(response, member);
  }
}
