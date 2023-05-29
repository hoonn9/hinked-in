import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmCustomModule.forCustomRepository([CompanyRepository]),
  ],
  providers: [],
})
export class CompanyModule {}
