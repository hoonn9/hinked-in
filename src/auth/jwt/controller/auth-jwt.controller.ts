import { HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';
import { AuthJwtCookieService } from '../service/auth-jwt-cookie.service';
import { JwtRefreshGuard } from '../guard/auth-refresh.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiHttpExceptionResponse } from '../../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../../../common/exception/constant';
import { UseController } from '../../../common/decorator/use-controller.decorator';

@ApiTags('auth')
@UseController('auth')
export class AuthJwtController {
  constructor(private readonly authJwtCookieService: AuthJwtCookieService) {}

  @ApiOperation({
    description: 'Refresh Token을 통해 토큰을 갱신합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '토큰 갱신에 성공했을 때의 응답입니다.',
    headers: {
      'Set-Cookie': {
        description: '새로운 Refresh Token과 Access Token입니다.',
        schema: {
          type: 'string',
          example: 'jwt={Access Token}; r-jwt={Refresh Token};',
        },
      },
    },
  })
  @ApiHttpExceptionResponse(HttpStatus.UNAUTHORIZED, [
    {
      title: 'Refresh Token 인증 정보가 존재하지 않을 경우',
      description: '인증 정보가 존재하지 않거나 올바르지 않을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.LoginNeed,
    },
  ])
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() member: MemberEntity,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    this.authJwtCookieService.refresh(response, member);
  }
}
