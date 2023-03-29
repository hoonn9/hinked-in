import { HttpException } from '@nestjs/common';
import { ExceptionResponse } from './exception.interface';

export class CoreHttpException extends HttpException {
  public readonly code: string;

  constructor(response: ExceptionResponse, public readonly errors?: Error[]) {
    super(response, response.statusCode);

    this.code = response.code;
    this.message = response.message;
  }
}
