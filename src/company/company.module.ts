import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { CompanyRepository } from './repository/company.repository';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyFollowEntity } from './entity/company-follow.entity';
import { CompanyFollowRepository } from './repository/company-follow.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, CompanyFollowEntity]),
    TypeOrmCustomModule.forCustomRepository([
      CompanyRepository,
      CompanyFollowRepository,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
