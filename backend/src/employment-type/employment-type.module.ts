import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EmploymentTypeService } from './employment-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentTypeEntity])],
  providers: [EmploymentTypeService],
  exports: [EmploymentTypeService],
})
export class EmploymentTypeModule {}
