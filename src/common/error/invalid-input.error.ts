import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvalidInputError extends Error {
  @ApiProperty({
    name: 'field',
    type: String,
    description: '검증에 실패한 필드명입니다.',
  })
  public readonly field: string;

  @ApiPropertyOptional({
    name: 'reasons',
    type: [{}],
    isArray: true,
  })
  public readonly reasons?: {
    [type: string]: string;
  };
  constructor(
    field: string,
    reasons?: {
      [type: string]: string;
    },
  ) {
    super();
    this.field = field;
    this.reasons = reasons;
  }
}
