import { Global, Logger, Module } from '@nestjs/common';
import { WinstonService } from '../common/lib/winston/winston.service';
import { CustomLoggerService } from './custom-logger.service';
import { WinstonModule } from '../common/lib/winston/winston.module';

@Global()
@Module({
  imports: [WinstonModule.register()],
  providers: [
    {
      provide: Logger,
      useClass: WinstonService,
    },
    CustomLoggerService,
  ],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
