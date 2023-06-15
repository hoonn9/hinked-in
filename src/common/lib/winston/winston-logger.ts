import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { context: 'unknown' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const logFormat = winston.format.printf((info) => {
  let result = `${info.timestamp} [${info.context}] ${info.level} ${info.message}`;
  if (info.stack) {
    result += `\n${info.stack}`;
  }
  return result;
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:SS',
        }),
        winston.format.colorize(),
        winston.format.simple(),
        logFormat,
      ),
    }),
  );
}

export class WinstonLogger implements LoggerService {
  log(message: any, context: string, ...optionalParams: any[]) {
    logger.log({
      level: 'info',
      message,
      context,
      ...optionalParams,
    });
  }

  error(
    message: any,
    stack?: string,
    context?: string,
    ...optionalParams: any[]
  ) {
    logger.log({
      level: 'error',
      message,
      stack,
      context,
      ...optionalParams,
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    logger.log({
      level: 'warn',
      message: message,
    });
  }

  debug?(message: any, ...optionalParams: any[]) {
    logger.log({
      level: 'debug',
      message: message,
    });
  }

  verbose?(message: any, ...optionalParams: any[]) {
    logger.log({
      level: 'verbose',
      message: message,
    });
  }
}
