import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from './entity/employment-type.entity';
import { EmploymentTypeService } from './employment-type.service';
import { EmploymentTypePaginationService } from './service/employment-type.pagination.service';
import { EmploymentTypeController } from './employment-type.controller';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { EmploymentTypeRepository } from './employment-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmploymentTypeEntity]),
    TypeOrmCustomModule.forCustomRepository([EmploymentTypeRepository]),
  ],
  controllers: [EmploymentTypeController],
  providers: [EmploymentTypeService, EmploymentTypePaginationService],
})
export class EmploymentTypeModule {}
