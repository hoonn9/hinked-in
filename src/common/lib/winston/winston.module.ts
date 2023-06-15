import { DynamicModule, Module } from '@nestjs/common';
import * as winston from 'winston';
import { WINSTON_LOGGER_TOKEN } from './winston.constant';
import { ConfigService } from '@nestjs/config';

@Module({})
export class WinstonModule {
  static register(): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useFactory: (configService: ConfigService) => {
            const logger = winston.createLogger({
              level: 'info',
              format: winston.format.json(),
              defaultMeta: {},
              transports: [],
            });

            if (process.env.NODE_ENV !== 'test') {
              logger.add(
                new winston.transports.File({
                  filename:
                    configService.get('LOGGING_ERROR_FILE_PATH') || 'error.log',
                  level: 'error',
                }),
              );

              logger.add(
                new winston.transports.File({
                  filename: configService.get('LOGGING_ALL_FILE_PATH'),
                }),
              );
            }

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

            return logger;
          },
          inject: [ConfigService],
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
