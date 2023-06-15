import { Global, Logger, Module } from '@nestjs/common';
import { WinstonLogger } from '../common/lib/winston/winston-logger';
import { CustomLoggerService } from './custom-logger.service';

@Global()
@Module({
  providers: [
    {
      provide: Logger,
      useClass: WinstonLogger,
    },
    CustomLoggerService,
  ],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
