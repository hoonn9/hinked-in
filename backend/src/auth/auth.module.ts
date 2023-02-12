import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthFederatedModule } from './auth-federated/auth-federated.module';
import { AuthLocalModule } from './auth-local/auth-local.module';

@Module({
  imports: [PassportModule, AuthFederatedModule, AuthLocalModule],
})
export class AuthModule {}
