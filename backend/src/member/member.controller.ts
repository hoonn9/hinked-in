import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberBodyDto } from './dto/create-member.dto';
import { UpdateMemberBodyDto } from './dto/update-member.dto';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from './entity/member.entity';
import { HttpExceptionFilter } from '../common/exception/exception-filter/http-exception-filter';

@UseFilters(HttpExceptionFilter)
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Auth()
  @Get('me')
  me(@CurrentUser() member: MemberEntity) {
    return member;
  }

  @TransactionRoute()
  @Post()
  create(
    @Body() createMemberBodyDto: CreateMemberBodyDto,
    @TransactionContext() manager: TransactionManager,
  ) {
    return this.memberService.addMember(createMemberBodyDto, manager);
  }

  @TransactionRoute()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberBodyDto,
    @TransactionContext() manager: TransactionManager,
  ) {
    return this.memberService.update(id, updateMemberDto, manager);
  }

  @TransactionRoute()
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @TransactionContext() manager: TransactionManager,
  ) {
    return this.memberService.remove(id, manager);
  }
}
