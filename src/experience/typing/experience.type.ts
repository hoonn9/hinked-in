import { Nullable } from '../../common/type/common.type';

export interface ExperienceConstructorParams {
  title: string;
  memberId: string;
  employmentTypeId: string;
  companyId: string;
  location: string;
  industryId: string;
  description?: Nullable<string>;
  headline: string;
  startDate: Date;
  endDate?: Nullable<Date>;
}
