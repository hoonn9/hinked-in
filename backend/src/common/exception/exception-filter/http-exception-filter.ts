import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreHttpException } from '../core-http-exception';
import { HttpExceptionResponseDto } from '../dto/http-exception-response.dto';
import { plainToInstance } from 'class-transformer';

@Catch(CoreHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CoreHttpException, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();

    response.statusCode = exception.getStatus();

    const plainResponseDto: HttpExceptionResponseDto = {
      code: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.path,
      errors: exception.errors,
    };

    const responseDto = plainToInstance(
      HttpExceptionResponseDto,
      plainResponseDto,
      {},
    );

    response.json(responseDto);
  }
}
