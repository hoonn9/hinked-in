import { Module } from '@nestjs/common';
import { IndustryPaginationService } from './service/industry.pagination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from './entity/industry.entity';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { IndustryRepository } from './industry.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndustryEntity]),
    TypeOrmCustomModule.forCustomRepository([IndustryRepository]),
  ],
  controllers: [IndustryController],
  providers: [IndustryPaginationService, IndustryService],
})
export class IndustryModule {}
