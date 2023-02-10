import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';

export class TestApplication {
  static async create(): Promise<NestApplication> {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
    }).compile();

    const app: NestApplication = moduleFixture.createNestApplication();
    await app.init();

    return app;
  }
}
