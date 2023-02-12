import { Controller, Get, Redirect, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { Member } from '../../../member/entity/member.entity';
import { Response } from 'express';

@Controller('auth/facebook')
export class AuthFacebookController {
  @UseGuards(AuthGuard('facebook'))
  @Get()
  async facebookLogin() {
    return 'ok';
  }

  @Redirect('/')
  @UseGuards(AuthGuard('facebook'))
  @Get('callback')
  async facebookLoginCallback(
    @CurrentUser() member: Member,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }
}
