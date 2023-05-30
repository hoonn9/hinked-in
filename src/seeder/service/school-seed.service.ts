import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.abstract.service';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { parseArrayByJSONFile } from '../../common/lib/parse';
import { SchoolEntity } from '../../school/entity/school.entity';
import { SchoolSeed } from '../../database/seed/type/school.seed';

const DEFAULT_FILE_PATH = path.join(
  __dirname,
  '../../database/seed/resource',
  'school.json',
);

@Injectable()
export class SchoolSeedService extends SeederService {
  constructor() {
    super();
  }

  async runFromJSONFile(
    manager: EntityManager,
    filePath = DEFAULT_FILE_PATH,
  ): Promise<void> {
    const seeds = await parseArrayByJSONFile(SchoolSeed, filePath);

    await manager.upsert(SchoolEntity, seeds, {
      conflictPaths: ['name'],
    });
  }
}
