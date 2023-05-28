import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from './entity/school.entity';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SchoolQueryService } from './service/school-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  controllers: [SchoolController],
  providers: [SchoolService, SchoolQueryService],
  exports: [SchoolQueryService],
})
export class SchoolModule {}
