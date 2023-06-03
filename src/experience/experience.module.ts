import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './entity/experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { ExperienceRepository } from './experience.repository';
import { EmploymentTypeRepository } from '../employment-type/employment-type.repository';
import { EmploymentTypeEntity } from '../employment-type/entity/employment-type.entity';
import { CompanyRepository } from '../company/repository/company.repository';
import { CompanyEntity } from '../company/entity/company.entity';
import { IndustryRepository } from '../industry/industry.repository';
import { IndustryEntity } from '../industry/entity/industry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExperienceEntity,
      EmploymentTypeEntity,
      CompanyEntity,
      IndustryEntity,
    ]),
    TypeOrmCustomModule.forCustomRepository([
      ExperienceRepository,
      EmploymentTypeRepository,
      CompanyRepository,
      IndustryRepository,
    ]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
