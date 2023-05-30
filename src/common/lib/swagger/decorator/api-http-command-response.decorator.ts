import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiHttpResponse } from './api-http-response.decorator';

export const ApiCommandHttpResponse = (statusCode = HttpStatus.OK) =>
  applyDecorators(
    ApiHttpResponse(statusCode, [
      {
        title: '요청에 성공한 경우',
        description: '요청에 성공했을 떄의 응답입니다.',
        type: true,
      },
    ]),
  );
