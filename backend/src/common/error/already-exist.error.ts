import { Type } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AlreadyExistError extends Error {
  @Exclude()
  public readonly entity: Type;

  @Exclude()
  public readonly conflictKey: string;

  @ApiProperty({ name: 'message', type: String })
  public readonly message: string;

  constructor(entity: Type, conflictKey: string) {
    super();
    this.entity = entity;
    this.conflictKey = conflictKey;
    this.message = `이미 존재하는 ${entity.name}입니다. (conflict: ${conflictKey})`;
  }
}
