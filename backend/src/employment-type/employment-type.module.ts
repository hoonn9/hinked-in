import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EmploymentTypeService } from './employment-type.service';
import { EmploymentTypeQueryService } from './service/employment-type-query.service';
import { EmploymentTypeController } from './employment-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentTypeEntity])],
  controllers: [EmploymentTypeController],
  providers: [EmploymentTypeService, EmploymentTypeQueryService],
  exports: [EmploymentTypeService, EmploymentTypeQueryService],
})
export class EmploymentTypeModule {}
