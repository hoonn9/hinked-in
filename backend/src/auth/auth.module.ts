import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { AuthLocalStrategy } from './strategy/auth-local.strategy';
import { AuthLocalController } from './controller/auth-local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthFederatedModule } from '../auth-federated/auth-federated.module';

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
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
