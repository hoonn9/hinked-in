import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ExperienceService } from '../experience.service';
import { GetMemberExperienceParamDto } from '../../member/dto/get-member-experience.dto';
import { ExperienceDto } from '../dto/experience.dto';
import { ApiHttpResponse } from '../../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { EXCEPTION_RESPONSE } from '../../common/exception/constant';

@ApiTags('member')
@UseController('member')
export class MemberExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({
    description: '멤버의 경력 리스트를 가져옵니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      description: '요청의 성공했을 때의 응답입니다.',
      type: [ExperienceDto],
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.NOT_FOUND, [
    {
      title: '멤버가 존재하지 않을 경우',
      description: '요청한 멤버ID를 가진 멤버가 존재하지 않을 때의 응답입니다.',
      response: EXCEPTION_RESPONSE.EntityNotExist,
    },
  ])
  @HttpCode(HttpStatus.OK)
  @Get(':id/experiences')
  async getMemberExperiences(
    @Param() params: GetMemberExperienceParamDto,
  ): Promise<ExperienceDto[]> {
    return this.experienceService.getMemberExperiences(params.id);
  }
}
