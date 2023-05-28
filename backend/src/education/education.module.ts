import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from './entity/education.entity';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [SchoolModule, TypeOrmModule.forFeature([EducationEntity])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
