import { Module } from '@nestjs/common';
import { CompanyQueryService } from './service/company-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyQueryService],
  exports: [CompanyQueryService],
})
export class CompanyModule {}
