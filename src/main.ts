import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/lib/swagger/setup-swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  setupSwagger(app, configService);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
