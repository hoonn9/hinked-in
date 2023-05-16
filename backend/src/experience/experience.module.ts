import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './entity/experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { EmploymentTypeModule } from '../employment-type/employment-type.module';
import { CompanyModule } from '../company/company.module';
import { IndustryModule } from '../industry/industry.module';
import { ExperienceQueryService } from './service/experience-query.service';

@Module({
  imports: [
    EmploymentTypeModule,
    CompanyModule,
    IndustryModule,
    TypeOrmModule.forFeature([ExperienceEntity]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService, ExperienceQueryService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
