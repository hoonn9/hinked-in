import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from '../dto/auth-local.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';
import { AuthJwtCookieService } from '../../jwt/service/auth-jwt-cookie.service';
import { HttpExceptionFilter } from '../../../common/exception/exception-filter/http-exception-filter';
import { HttpResponseInterceptor } from '../../../common/interceptor/http-response.interceptor';
import { InvalidInputError } from '../../../common/error/invalid-input.error';
import { ApiHttpExceptionResponse } from '../../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../../../common/exception/constant';

@ApiTags('auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('auth')
export class AuthLocalController {
  constructor(private readonly authJwtCookieService: AuthJwtCookieService) {}

  @ApiImplicitBody({
    name: 'body',
    type: AuthLocalBodyDto,
    content: {},
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그인 성공',
  })
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST, [
    {
      title: '입력 정보가 검증 규칙에 위배된 경우',
      description: '입력 정보가 검즘에 실패했을 때 응답입니다.',
      type: InvalidInputError,
      response: EXCEPTION_RESPONSE.InvalidInputValue,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.UNAUTHORIZED, [
    {
      title: '존재하지 않는 사용자 정보일 경우',
      description: '존재허지 않는 사용자의 정보를 입력했을 때 응답입니다.',
      response: EXCEPTION_RESPONSE.LoginFail,
    },
  ])
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
