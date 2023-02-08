import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLocalStrategy } from './strategy/auth-local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member.entity';
import { JwtModule } from '@nestjs/jwt';

const strategies = [AuthLocalStrategy];

@Module({
  imports: [PassportModule, JwtModule, TypeOrmModule.forFeature([Member])],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
