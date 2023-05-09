import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.abstract.service';
import { EmploymentTypeEntity } from '../../employment-type/entity/employment-type.entity';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { EmploymentTypeSeed } from '../../database/seed/type/employment-type.seed';
import { parseArrayByJSONFile } from '../../common/lib/parse';

const DEFAULT_FILE_PATH = path.join(
  __dirname,
  '../../database/seed/resource',
  'employment-type.json',
);

@Injectable()
export class EmploymentTypeSeedService extends SeederService {
  constructor() {
    super();
  }

  async runFromJSONFile(
    manager: EntityManager,
    filePath = DEFAULT_FILE_PATH,
  ): Promise<void> {
    const seeds = await parseArrayByJSONFile(EmploymentTypeSeed, filePath);

    await manager.upsert(EmploymentTypeEntity, seeds, {
      conflictPaths: ['name'],
    });
  }
}
