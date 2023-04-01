import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { MemberEntity } from '../../../member/entity/member.entity';
import { Response } from 'express';
import { AuthJwtCookieService } from '../service/auth-jwt-cookie.service';
import { JwtRefreshGuard } from '../guard/auth-refresh.guard';

@Controller('auth')
export class AuthJwtController {
  constructor(private readonly authJwtCookieService: AuthJwtCookieService) {}

  @UseGuards(JwtRefreshGuard)
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
