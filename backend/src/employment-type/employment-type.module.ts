import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EmploymentTypeService } from './employment-type.service';
import { EmploymentTypeQueryService } from './service/employment-type-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentTypeEntity])],
  providers: [EmploymentTypeService, EmploymentTypeQueryService],
  exports: [EmploymentTypeService, EmploymentTypeQueryService],
})
export class EmploymentTypeModule {}
