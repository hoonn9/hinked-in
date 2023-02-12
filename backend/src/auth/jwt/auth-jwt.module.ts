import { Module } from '@nestjs/common';
import { AuthJwtCookieService } from './service/auth-jwt-cookie.service';
import { AuthJwtGeneratorService } from './service/auth-jwt-generator.service';
import { CookieService } from '../../common/service/cookie.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [AuthJwtCookieService, AuthJwtGeneratorService, CookieService],
  exports: [AuthJwtCookieService],
})
export class AuthJwtModule {}
