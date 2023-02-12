import { Module, Provider } from '@nestjs/common';
import { AuthFacebookStrategy } from './strategy/auth-facebook.strategy';
import { AuthGoogleStrategy } from './strategy/auth-google.strategy';
import { AuthFacebookValidateService } from './service/auth-facebook-validate.service';
import { AuthFederateEnum } from './enum/auth-federate.enum';
import { AuthGoogleValidateService } from './service/auth-google-validate.service';
import { AuthFederatedService } from './service/auth-federated.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FederatedCredential } from './entity/federated-credential.entity';
import { Member } from '../../member/entity/member.entity';
import { AuthFacebookController } from './controller/auth-facebook.controller';
import { AuthGoogleController } from './controller/auth-google.controller';
import { AuthJwtModule } from '../jwt/auth-jwt.module';

const federationServices: Record<AuthFederateEnum, Provider[]> = {
  FACEBOOK: [AuthFacebookStrategy, AuthFacebookValidateService],
  GOOGLE: [AuthGoogleStrategy, AuthGoogleValidateService],
};

const federationProviders = Object.values(federationServices).flat();

@Module({
  imports: [
    AuthJwtModule,
    TypeOrmModule.forFeature([FederatedCredential, Member]),
  ],
  controllers: [AuthFacebookController, AuthGoogleController],
  providers: [AuthFederatedService, ...federationProviders],
  exports: [...federationProviders],
})
export class AuthFederatedModule {}
