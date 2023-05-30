import { Get, HttpStatus, Redirect, Res, UseGuards } from '@nestjs/common';
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
import { UseController } from '../../../common/decorator/use-controller.decorator';

@ApiTags('auth')
@UseController('auth/facebook')
export class AuthFacebookController {
  @ApiOperation({
    description: '페이스북 로그인 페이지로 연결합니다.',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    content: {
      'application/json': {
        examples: {
          '응답에 성공한 경우': {
            value: undefined,
            description:
              '페이스북 로그인 페이지로 임시 이동 후 유저가 로그인에 성공 했을 경우 /auth/facebook/callback으로 Redirect됩니다.',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard('facebook'))
  @Get()
  async facebookLogin() {
    return 'ok';
  }

  @ApiExcludeEndpoint()
  @Redirect('/')
  @UseGuards(AuthGuard('facebook'))
  @Get('callback')
  async facebookLoginCallback(
    @CurrentUser() member: MemberEntity,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }
}
