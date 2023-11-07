import { ERoleBasic } from '../../enum/role.enum';
import { ETypeAccount } from '../../enum/type-account.enum';

export class UserDetailsResDto {
  id: string;
  userName: string;
  email: string;
  role: ERoleBasic;
  typeAccount: ETypeAccount;
  createdAt: Date;
  updatedAt: Date;
}
