import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.abstract.service';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { parseArrayByJSONFile } from '../../common/lib/parse';
import { IndustrySeed } from '../../database/seed/type/industry.seed';
import { IndustryEntity } from '../../industry/entity/industry.entity';

const DEFAULT_FILE_PATH = path.join(
  __dirname,
  '../../database/seed/resource',
  'industry.json',
);

@Injectable()
export class IndustrySeedService extends SeederService {
  constructor() {
    super();
  }

  async runFromJSONFile(
    manager: EntityManager,
    filePath = DEFAULT_FILE_PATH,
  ): Promise<void> {
    const seeds = await parseArrayByJSONFile(IndustrySeed, filePath);

    await manager.upsert(IndustryEntity, seeds, {
      conflictPaths: ['name'],
    });
  }
}
