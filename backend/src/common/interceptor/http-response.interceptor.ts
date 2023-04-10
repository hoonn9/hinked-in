import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpResponse } from '../response/http-response.interface';
import { HTTP_RESPONSE_SUCCESS_CODE } from '../response/constants';

@Injectable()
export class HttpResponseInterceptor<T> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<HttpResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: HTTP_RESPONSE_SUCCESS_CODE,
          data: data || true,
        };
      }),
    );
  }
}
