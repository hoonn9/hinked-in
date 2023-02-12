import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberBodyDto } from './dto/create-member-body.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { TransactionManagerParam } from '../common/decorator/transaction-manager.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { Member } from './entity/member.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @TransactionRoute()
  @Post()
  create(
    @Body() createMemberBodyDto: CreateMemberBodyDto,
    @TransactionManagerParam() manager: TransactionManager,
  ) {
    return this.memberService.addMember(createMemberBodyDto, manager);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Auth()
  @Get('me')
  me(@CurrentUser() member: Member) {
    return member;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
