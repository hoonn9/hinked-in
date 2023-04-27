import {
  Controller,
  Get,
  HttpStatus,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth/google')
export class AuthGoogleController {
  @ApiOperation({
    description: '구글 로그인 페이지로 연결합니다.',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    content: {
      'application/json': {
        examples: {
          '응답에 성공한 경우': {
            value: undefined,
            description:
              '구글 로그인 페이지로 임시 이동 후 유저가 로그인에 성공 했을 경우 /auth/google/callback으로 Redirect됩니다.',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard('google'))
  @Get()
  async googleLogin() {
    return 'ok';
  }

  @ApiExcludeEndpoint()
  @Redirect('/')
  @UseGuards(AuthGuard('google'))
  @Get('callback')
  async googleLoginCallback(
    @CurrentUser() member: MemberEntity,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }
}
