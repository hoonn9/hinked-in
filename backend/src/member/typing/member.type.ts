import { Nullable } from '../../common/type/common.type';

export interface MemberConstructorParams {
  email: string;
  lastName?: Nullable<string>;
  firstName?: Nullable<string>;
  password?: Nullable<string>;
  phoneNumber?: Nullable<string>;
}
