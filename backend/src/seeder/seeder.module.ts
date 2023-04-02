import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validateSeederConfig } from './seeder-config-validator';
import { SeederExecutionService } from './seeder-execution.service';
import { DiscoveryModule } from '@nestjs/core';
import { EmploymentTypeSeedService } from './service/employment-type-seed.service';

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
  providers: [SeederExecutionService, EmploymentTypeSeedService],
})
export class SeederModule {}
