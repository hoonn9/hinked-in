import { Nullable } from '../../common/type/common.type';

export interface ExperienceConstructorParams {
  title: string;
  memberId: string;
  employmentTypeId: string;
  companyName: string;
  location: string;
  industry: string;
  description?: Nullable<string>;
  headline: string;
  startDate: Date;
  endDate?: Nullable<Date>;
}
