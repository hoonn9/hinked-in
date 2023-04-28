import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validateSeederConfig } from './seeder-config-validator';
import { SeederExecutionService } from './seeder-execution.service';
import { DiscoveryModule } from '@nestjs/core';
import { EmploymentTypeSeedService } from './service/employment-type-seed.service';
import { IndustrySeedService } from './service/industry-seed.service';

const seedServices = [EmploymentTypeSeedService, IndustrySeedService];

@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      validate: validateSeederConfig,
    }),
    DatabaseModule,
  ],
  providers: [SeederExecutionService, ...seedServices],
})
export class SeederModule {}
