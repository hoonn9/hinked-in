import { ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { Get, Param } from '@nestjs/common';
import { ExperienceService } from '../../experience/experience.service';
import { MemberService } from '../member.service';
import { GetMemberExperienceParamDto } from '../dto/get-member-experience.dto';

@ApiTags('member')
@UseController('member')
export class MemberExperienceController {
  constructor(
    private readonly memberService: MemberService,
    private readonly experienceService: ExperienceService,
  ) {}

  @Get(':memberId/experiences')
  async getMemberExperiences(@Param() params: GetMemberExperienceParamDto) {
    const member = await this.memberService.getMember(params.memberId);
    return this.experienceService.getMemberExperiences(member);
  }
}
