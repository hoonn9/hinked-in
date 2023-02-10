import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLocalStrategy } from './strategy/auth-local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthFacebookStrategy } from './strategy/federate/auth-facebook.strategy';
import { AuthGoogleStrategy } from './strategy/federate/auth-google.strategy';
import { FederatedCredential } from './entity/federated-credential.entity';
import { AuthFederateService } from './service/auth-federate.service';
import { AuthGoogleValidateService } from './service/auth-google-validate.service';
import { AuthFacebookValidateService } from './service/auth-facebook-validate.service';

const strategies = [
  AuthLocalStrategy,
  AuthFacebookStrategy,
  AuthGoogleStrategy,
];

const federatedCredentialServices = [
  AuthFederateService,
  AuthGoogleValidateService,
  AuthFacebookValidateService,
];

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule,
    CryptoModule,
    TypeOrmModule.forFeature([Member, FederatedCredential]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...federatedCredentialServices, ...strategies],
})
export class AuthModule {}
