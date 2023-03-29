import { HttpStatus } from '@nestjs/common';

export interface ExceptionResponse {
  statusCode: HttpStatus;
  code: string;
  message: string;
}
