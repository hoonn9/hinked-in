import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entity/member.entity';
import { CryptoModule } from '../crypto/crypto.module';
import { MemberExperienceController } from './controller/member-experience.controller';
import { ExperienceModule } from '../experience/experience.module';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { MemberRepository } from './member.repository';

@Module({
  imports: [
    CryptoModule,
    ExperienceModule,
    TypeOrmModule.forFeature([MemberEntity]),
    TypeOrmCustomModule.forCustomRepository([MemberRepository]),
  ],
  controllers: [MemberController, MemberExperienceController],
  providers: [MemberService],
})
export class MemberModule {}
