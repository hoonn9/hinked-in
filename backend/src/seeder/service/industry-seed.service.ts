import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.abstract.service';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { parseArrayByJSONFile } from '../../common/lib/parse';
import { IndustrySeed } from '../../database/seed/type/industry.seed';
import { IndustryEntity } from '../../industry/entity/industry.entity';

@Injectable()
export class IndustrySeedService extends SeederService {
  private readonly filePath = path.join(
    __dirname,
    '../../database/seed/resource',
    'industry.json',
  );

  constructor() {
    super();
  }

  async run(manager: EntityManager): Promise<void> {
    const seeds = await parseArrayByJSONFile(IndustrySeed, this.filePath);

    await manager.upsert(IndustryEntity, seeds, {
      conflictPaths: ['name'],
    });
  }
}
