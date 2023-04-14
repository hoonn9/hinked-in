import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvalidInputError extends Error {
  @ApiProperty({ name: 'field', type: String })
  public readonly field: string;

  @ApiPropertyOptional({
    name: 'reasons',
    type: [],
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
