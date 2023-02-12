import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../guard/auth-local.guard';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthLocalBodyDto } from '../dto/auth-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../decorator/current-user.decorator';
import { Member } from '../../member/entity/member.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthLocalController {
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
}
