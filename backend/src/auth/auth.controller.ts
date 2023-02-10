import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guard/auth-local.guard';
import { Member } from '../member/entity/member.entity';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from './dto/auth-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { TransactionInterceptor } from '../common/interceptor/transaction.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiImplicitBody({
    name: 'body',
    type: AuthLocalBodyDto,
    content: {},
  })
  @UseGuards(AuthLocalGuard)
  @UseInterceptors(TransactionInterceptor)
  @Post('login')
  async login(@Req() req: Express.Request & { user: Member }) {
    return req.user.id;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async facebookLogin(@Req() req: any) {
    console.log(req);
  }

  @Redirect('/')
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  async facebookLoginCallback(@Req() req: any, @Res() res: Response) {
    console.log(req.entityManager);
    res.cookie('token', req.user.id);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(@Req() req: any) {
    console.log(req);
  }

  @Redirect('/')
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    res.cookie('token', req.user.id);
  }
}
