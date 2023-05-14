import { Module } from '@nestjs/common';
import { IndustryQueryService } from './service/industry-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from './entity/industry.entity';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndustryEntity])],
  controllers: [IndustryController],
  providers: [IndustryQueryService, IndustryService],
  exports: [IndustryQueryService],
})
export class IndustryModule {}
