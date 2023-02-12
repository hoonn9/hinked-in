import {
  Controller,
  Get,
  Post,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthLocalGuard } from './guard/auth-local.guard';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from './dto/auth-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from './decorator/current-user.decorator';
import { Member } from '../member/entity/member.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiImplicitBody({
    name: 'body',
    type: AuthLocalBodyDto,
    content: {},
  })
  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(@CurrentUser() member: Member) {
    return member.id;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async facebookLogin() {
    return 'ok';
  }

  @Redirect('/')
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookLoginCallback(
    @CurrentUser() member: Member,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    return 'ok';
  }

  @Redirect('/')
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(
    @CurrentUser() member: Member,
    @Res() res: Response,
  ) {
    res.cookie('token', member.id);
  }
}
