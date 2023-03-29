import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { CryptoModule } from '../crypto/crypto.module';
import { MemberQueryService } from './service/member-query.service';

@Module({
  imports: [CryptoModule, TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberQueryService],
})
export class MemberModule {}
