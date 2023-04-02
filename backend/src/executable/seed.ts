import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../seeder/seeder.module';
import { SeederExecutionService } from '../seeder/seeder-execution.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seederExecutionService = app.get(SeederExecutionService);
  await seederExecutionService.execute();
}
bootstrap();
