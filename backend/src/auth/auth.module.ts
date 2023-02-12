import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthLocalValidateService } from './service/auth-local-validate.service';
import { AuthLocalStrategy } from './strategy/auth-local.strategy';
import { AuthLocalController } from './controller/auth-local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthFederatedModule } from '../auth-federated/auth-federated.module';
import { AuthJwtCookieService } from './service/auth-jwt-cookie.service';
import { AuthJwtGeneratorService } from './service/auth-jwt-generator.service';
import { CookieService } from '../common/service/cookie.service';

const strategies = [AuthLocalStrategy];

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule,
    CryptoModule,
    TypeOrmModule.forFeature([Member]),
    AuthFederatedModule,
  ],
  controllers: [AuthLocalController],
  providers: [
    AuthLocalValidateService,
    AuthJwtGeneratorService,
    AuthJwtCookieService,
    CookieService,
    ...strategies,
  ],
})
export class AuthModule {}
