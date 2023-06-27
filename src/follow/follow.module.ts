import { Module } from '@nestjs/common';
import { MemberFollowController } from './controller/member-follow.controller';
import { MemberFollowService } from './service/member-follow.service';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { FollowRepository } from './repository/follow.repository';
import { MemberRepository } from '../member/member.repository';
import { FollowService } from './service/follow.service';
import { CompanyFollowService } from './service/company-follow.service';
import { CompanyRepository } from '../company/repository/company.repository';
import { CompanyFollowController } from './controller/company-follow.controller';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      FollowRepository,
      MemberRepository,
      CompanyRepository,
    ]),
  ],
  controllers: [MemberFollowController, CompanyFollowController],
  providers: [MemberFollowService, CompanyFollowService, FollowService],
})
export class FollowModule {}
