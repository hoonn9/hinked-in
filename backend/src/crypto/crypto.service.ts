import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly SALT_ROUNDS: number;
  constructor(private readonly configService: ConfigService) {
    this.SALT_ROUNDS = this.configService.getOrThrow<number>('SALT_ROUNDS');
  }

  hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.SALT_ROUNDS);
  }

  comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
