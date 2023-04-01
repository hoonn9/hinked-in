import { Controller, Get, Redirect, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';

@Controller('auth/google')
export class AuthGoogleController {
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    return 'ok';
  }

  @Redirect('/')
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(
    @CurrentUser() member: MemberEntity,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }
}
