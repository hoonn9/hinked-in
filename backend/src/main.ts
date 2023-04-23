import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/lib/swagger/setup-swagger';
import { validationPipe } from './common/pipe/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  setupSwagger(app, configService);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
