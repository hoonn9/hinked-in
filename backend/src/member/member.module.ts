import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entity/member.entity';
import { CryptoModule } from '../crypto/crypto.module';
import { MemberQueryService } from './service/member-query.service';
import { MemberExperienceController } from './controller/member-experience.controller';
import { ExperienceModule } from '../experience/experience.module';

@Module({
  imports: [
    CryptoModule,
    ExperienceModule,
    TypeOrmModule.forFeature([MemberEntity]),
  ],
  controllers: [MemberController, MemberExperienceController],
  providers: [MemberService, MemberQueryService],
})
export class MemberModule {}
