import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { envFilePath } from '../../src/common/config/env-file-path';
import { ModuleMetadata } from '@nestjs/common';
import { validateConfig } from '../../src/common/config/config-validator';
import { DataSource } from 'typeorm';
import { CustomLoggerModule } from '../../src/logger/custom-logger.module';

export class TestingFixture {
  public dataSource: DataSource;
  private _app: NestApplication | null;

  private constructor(
    public readonly module: TestingModule,
    app: NestApplication | null,
  ) {
    this._app = app;
    this.dataSource = module.get(DataSource);
  }

  get app() {
    if (!this._app) {
      throw new Error('Application is not initialized');
    }

    return this._app;
  }

  async finish() {
    await this.dataSource.dropDatabase();
  }

  static async createModule(
    metadata?: ModuleMetadata,
  ): Promise<TestingFixture> {
    const moduleFixture = await TestingFixture.createTestingModule(
      metadata,
    ).compile();

    return new TestingFixture(moduleFixture, null);
  }

  static async createApp(metadata?: ModuleMetadata): Promise<TestingFixture> {
    const moduleFixture = await TestingFixture.createTestingModule(
      metadata,
    ).compile();

    const app: NestApplication = moduleFixture.createNestApplication();
    await app.init();

    return new TestingFixture(moduleFixture, app);
  }

  private static createTestingModule(metadata?: ModuleMetadata) {
    return Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          envFilePath,
          isGlobal: true,
          validate: validateConfig,
        }),
        CustomLoggerModule,
        ...(metadata?.imports ?? []),
      ],
      controllers: [...(metadata?.controllers ?? [])],
      providers: [...(metadata?.providers ?? [])],
      exports: [...(metadata?.exports ?? [])],
    });
  }
}
