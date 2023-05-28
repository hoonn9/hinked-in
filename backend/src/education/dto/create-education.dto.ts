import { PickType } from '@nestjs/swagger';
import { EducationDto } from './education.dto';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';

export class CreateEducationBodyDto extends PickType(EducationDto, [
  'degree',
  'grade',
  'startDate',
  'endDate',
  'fieldOfStudy',
]) {
  @ApiUUIDProperty({
    name: 'schoolId',
    type: String,
  })
  @IsID()
  schoolId: string;
}
