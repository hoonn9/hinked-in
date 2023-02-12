import { Module } from '@nestjs/common';
import { AuthLocalStrategy } from './strategy/auth-local.strategy';
import { AuthLocalController } from './controller/auth-local.controller';
import { AuthLocalValidateService } from './service/auth-local-validate.service';
import { CryptoModule } from '../../crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../member/entity/member.entity';
import { AuthJwtModule } from '../jwt/auth-jwt.module';

@Module({
  imports: [AuthJwtModule, CryptoModule, TypeOrmModule.forFeature([Member])],
  controllers: [AuthLocalController],
  providers: [AuthLocalValidateService, AuthLocalStrategy],
})
export class AuthLocalModule {}
