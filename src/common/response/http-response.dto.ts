import { ApiProperty } from '@nestjs/swagger';

export class HttpResponseDto<T> {
  @ApiProperty({
    name: 'code',
    type: String,
    description: '성공을 식별하는 코드입니다.',
  })
  code: string;

  @ApiProperty({
    name: 'data',
    type: 'generic',
    description: '응답 데이터입니다.',
  })
  data: T;
}
