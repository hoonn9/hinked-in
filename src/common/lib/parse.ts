import * as fs from 'fs/promises';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Type } from '@nestjs/common';

export const parseArrayByJSONFile = async <T>(
  cls: Type<T>,
  filePath: string,
): Promise<T[]> => {
  const fileTextRaw = await fs.readFile(filePath, 'utf-8');
  const parsedRaw = JSON.parse(fileTextRaw);

  if (!Array.isArray(parsedRaw)) {
    throw new Error();
  }

  return parsedRaw.map((raw) => {
    const instance = plainToInstance(cls, raw);
    validateOrReject(instance as Type<T>, {
      whitelist: true,
    });
    return instance;
  });
};
