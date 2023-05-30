import {
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  applyDecorators,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../exception/exception-filter/http-exception-filter';
import { HttpResponseInterceptor } from '../interceptor/http-response.interceptor';
import { validationPipe } from '../pipe/validation-pipe';

export const UseController = (prefix: string | string[]) =>
  applyDecorators(
    Controller(prefix),
    UseFilters(HttpExceptionFilter),
    UseInterceptors(HttpResponseInterceptor),
    UsePipes(validationPipe),
  );
