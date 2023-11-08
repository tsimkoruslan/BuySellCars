import { ERoleBasic } from '../../enum/role.enum';
import { ETypeAccount } from '../../enum/type-account.enum';
import { CarDetailsResDto } from '../../../car/dto/response/car-details-res.dto';

export class UserDetailsResDto {
  id: string;
  userName: string;
  email: string;
  role: ERoleBasic;
  typeAccount: ETypeAccount;
  cars?: CarDetailsResDto[];
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

export class UserListItemResponseDto {
  id: string;
  userName: string;
  email: string;
  role: ERoleBasic;
  typeAccount: ETypeAccount;
  password: string;
}
