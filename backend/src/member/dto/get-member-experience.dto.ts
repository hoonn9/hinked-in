import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';

export class GetMemberExperienceParamDto {
  @ApiUUIDProperty({
    name: 'memberId',
    description: '멤버 ID입니다.',
  })
  @IsID()
  memberId: string;
}
