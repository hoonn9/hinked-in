import { Type } from '@nestjs/common';

export class AlreadyExistError extends Error {
  constructor(
    public readonly entity: Type,
    public readonly conflictKey: string,
  ) {
    super(`이미 존재하는 ${entity.name}입니다. (conflict: ${conflictKey})`);
  }
}
