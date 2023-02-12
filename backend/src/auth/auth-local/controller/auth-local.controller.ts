import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from '../dto/auth-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { Member } from '../../../member/entity/member.entity';
import { Response } from 'express';
import { AuthJwtCookieService } from '../../jwt/service/auth-jwt-cookie.service';

@ApiTags('auth')
@Controller('auth')
export class AuthLocalController {
  constructor(private readonly authJwtCookieService: AuthJwtCookieService) {}

  @ApiImplicitBody({
    name: 'body',
    type: AuthLocalBodyDto,
    content: {},
  })
  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @CurrentUser() member: Member,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    this.authJwtCookieService.login(res, member);
  }
}
