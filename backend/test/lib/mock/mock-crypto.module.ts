import { Module } from '@nestjs/common';
import { CryptoService } from '../../../src/crypto/crypto.service';
import { ConfigModule } from '@nestjs/config';

const mockEnvs = {
  SALT_ROUNDS: 1,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => mockEnvs],
    }),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class MockCryptoModule {}
