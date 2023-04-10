import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exception/exception-filter/http-exception-filter';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateExperienceBodyDto } from './dto/create-experience.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponseInterceptor } from '../common/interceptor/http-response.interceptor';
import { ExperienceService } from './experience.service';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';

@ApiTags('experience')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ description: '경력을 생성한다.' })
  @ApiCreatedResponse({
    description: '생성 성공',
  })
  @ApiNotFoundResponse({
    description:
      '존재하지 않는 EmploymentTypeId를 입력했을 때 예외가 발생한다.',
  })
  @Auth()
  @TransactionRoute()
  @Post()
  async create(
    @TransactionContext() manager: TransactionManager,
    @CurrentUser() member: MemberEntity,
    @Body() body: CreateExperienceBodyDto,
  ): Promise<void> {
    await this.experienceService.addExperience(body, member, manager);
  }
}
