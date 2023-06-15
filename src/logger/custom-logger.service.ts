import { Injectable, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class CustomLoggerService {
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  logUncaught(exception: unknown, request: Request, context: string) {
    const requestUrl = this.httpAdapterHost.httpAdapter.getRequestUrl(request);
    const httpMethod =
      this.httpAdapterHost.httpAdapter.getRequestMethod(request);

    if (exception instanceof Error) {
      return this.logger.error(
        `${httpMethod} ${requestUrl} ${exception.message}`,
        exception.stack,
        context,
      );
    }

    return this.logger.error(exception);
  }
}
