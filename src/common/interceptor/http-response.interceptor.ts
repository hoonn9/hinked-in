import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpResponseDto } from '../response/http-response.dto';
import { HTTP_RESPONSE_SUCCESS_CODE } from '../response/constants';

@Injectable()
export class HttpResponseInterceptor<T> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<HttpResponseDto<T>>> {
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
