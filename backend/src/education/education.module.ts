import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from './entity/education.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { EducationRepository } from './education.repository';
import { SchoolRepository } from '../school/school.repository';
import { SchoolEntity } from '../school/entity/school.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationEntity, SchoolEntity]),
    TypeOrmCustomModule.forCustomRepository([
      EducationRepository,
      SchoolRepository,
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
