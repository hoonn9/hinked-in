import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreHttpException } from '../core-http-exception';

@Catch(CoreHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CoreHttpException, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();

    response.json({
      statusCode: exception.getStatus(),
      code: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.path,
      errors: exception.errors,
    });
  }
}
