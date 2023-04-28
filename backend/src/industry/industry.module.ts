import { Module } from '@nestjs/common';
import { IndustryQueryService } from './service/industry-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from './entity/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndustryEntity])],
  providers: [IndustryQueryService],
  exports: [IndustryQueryService],
})
export class IndustryModule {}
