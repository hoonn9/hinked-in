import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_LOGGER_TOKEN } from './winston.constant';

@Injectable()
export class WinstonService implements LoggerService {
  constructor(
    @Inject(WINSTON_LOGGER_TOKEN)
    private readonly logger: Logger,
  ) {}

  log(message: any, context?: string) {
    this.logger.log({
      level: 'info',
      message,
      context,
    });
  }

  error(message: any, stack?: string, context?: string) {
    this.logger.log({
      level: 'error',
      message,
      stack,
      context,
    });
  }

  warn(message: any, context?: string) {
    this.logger.log({
      level: 'warn',
      message,
      context,
    });
  }

  debug?(message: any, context?: string) {
    this.logger.log({
      level: 'debug',
      message,
      context,
    });
  }

  verbose?(message: any, context?: string) {
    this.logger.log({
      level: 'verbose',
      message,
      context,
    });
  }
}
