import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EXCEPTION_RESPONSE } from '../constant';
import { CustomLoggerService } from '../../../logger/custom-logger.service';

@Injectable()
@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
  constructor(private readonly customLoggerService: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();

    this.customLoggerService.logUncaught(exception, request);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.statusCode = status;
    response.json(EXCEPTION_RESPONSE.Uncaught);
  }
}
