import { Module } from '@nestjs/common';
import { AuthJwtCookieService } from './service/auth-jwt-cookie.service';
import { AuthJwtGeneratorService } from './service/auth-jwt-generator.service';
import { CookieService } from '../../common/service/cookie.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategy/auth-refresh.strategy';
import { AuthJwtValidateService } from './service/auth-jwt-validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../member/entity/member.entity';
import { AuthJwtController } from './controller/auth-jwt.controller';
import { JwtAccessStrategy } from './strategy/auth-access.strategy';

const strategies = [JwtRefreshStrategy, JwtAccessStrategy];

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Member])],
  controllers: [AuthJwtController],
  providers: [
    AuthJwtCookieService,
    AuthJwtGeneratorService,
    AuthJwtValidateService,
    CookieService,
    ...strategies,
  ],
  exports: [AuthJwtCookieService],
})
export class AuthJwtModule {}
