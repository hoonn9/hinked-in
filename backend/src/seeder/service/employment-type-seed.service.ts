import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder-abstract.service';
import { EmploymentTypeEntity } from '../../employment-type/entity/employment-type.entity';
import { EntityManager } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { plainToInstance } from 'class-transformer';
import { EmploymentTypeSeed } from '../validator/employment-type-seed.validator';
import { validateOrReject } from 'class-validator';

@Injectable()
export class EmploymentTypeSeedService extends SeederService {
  private readonly filePath = path.join(
    __dirname,
    '../../database/seed',
    'employment-type.json',
  );

  constructor() {
    super();
  }

  async run(manager: EntityManager): Promise<void> {
    const fileTextRaw = await fs.readFile(this.filePath, 'utf-8');

    const parsedRaw = JSON.parse(fileTextRaw);

    if (!Array.isArray(parsedRaw)) {
      throw new Error();
    }

    const result = parsedRaw.map((raw) => {
      const instance = plainToInstance(EmploymentTypeSeed, raw);
      validateOrReject(instance, {
        whitelist: true,
      });
      return instance;
    });

    await manager.upsert(EmploymentTypeEntity, result, {
      conflictPaths: ['name'],
    });
  }
}
