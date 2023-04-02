import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.abstract.service';
import { EmploymentTypeEntity } from '../../employment-type/entity/employment-type.entity';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { EmploymentTypeSeed } from '../../database/seed/type/employment-type.seed';
import { parseArrayByJSONFile } from '../../common/lib/parse';

@Injectable()
export class EmploymentTypeSeedService extends SeederService {
  private readonly filePath = path.join(
    __dirname,
    '../../database/seed/resource',
    'employment-type.json',
  );

  constructor() {
    super();
  }

  async run(manager: EntityManager): Promise<void> {
    const seeds = await parseArrayByJSONFile(EmploymentTypeSeed, this.filePath);

    await manager.upsert(EmploymentTypeEntity, seeds, {
      conflictPaths: ['name'],
    });
  }
}
