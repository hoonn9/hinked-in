import { Nullable } from '../../common/type/common.type';
import { MemberEntity } from '../../member/entity/member.entity';
import { SchoolEntity } from '../../school/entity/school.entity';

export interface EducationConstructorParams {
  fieldOfStudy?: Nullable<string>;
  degree?: Nullable<string>;
  grade?: Nullable<string>;
  startDate?: Nullable<Date>;
  endDate?: Nullable<Date>;
  school: SchoolEntity;
  member: MemberEntity;
}
