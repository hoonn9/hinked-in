import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { CompanyRepository } from './repository/company.repository';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { FollowRepository } from '../follow/repository/follow.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmCustomModule.forCustomRepository([
      CompanyRepository,
      FollowRepository,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
