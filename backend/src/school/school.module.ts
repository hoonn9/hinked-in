import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from './entity/school.entity';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SchoolPaginationService } from './service/school.pagination.service';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { SchoolRepository } from './school.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolEntity]),
    TypeOrmCustomModule.forCustomRepository([SchoolRepository]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, SchoolPaginationService],
})
export class SchoolModule {}
