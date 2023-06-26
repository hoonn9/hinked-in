import { Module } from '@nestjs/common';
import { MemberFollowController } from './controller/member-follow.controller';
import { MemberFollowService } from './service/member-follow.service';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { FollowRepository } from './repository/follow.repository';
import { MemberRepository } from '../member/member.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      FollowRepository,
      MemberRepository,
    ]),
  ],
  controllers: [MemberFollowController],
  providers: [MemberFollowService],
})
export class FollowModule {}
