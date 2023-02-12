import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormOptionFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'test') {
      return this.testOptions();
    }
    return this.localOptions();
  }

  private localOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      entities: [`${__dirname}../../../**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: 'all',
    };
  }

  private testOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [`${__dirname}../../../**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: 'all',
    };
  }
}
