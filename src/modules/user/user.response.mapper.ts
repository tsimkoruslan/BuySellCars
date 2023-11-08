import {
  UserDetailsResDto,
  UserListItemResponseDto,
} from './dto/response/user-details-res.dto';
import { CarResponseMapper } from '../car/car.response.mapper';
import { UserCreateReqDto } from './dto/request/user-req-create.dto';
import { UserEntity } from '../../database/user.entity';
import { ERoleBasic } from './enum/role.enum';
import { ETypeAccount } from './enum/type-account.enum';
import { CarCreateReqDto } from '../car/dto/request/car-req-create.dto';
import { CarDetailsResDto } from '../car/dto/response/car-details-res.dto';

export class UserResponseMapper {
  static toDetailsListDto(data: UserCreateReqDto[]): UserDetailsResDto[] {
    return data.map(this.toDetailsDto);
  }
  static toDetailsDto(data: UserDetailsResDto): UserDetailsResDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      typeAccount: data.typeAccount,
      role: data.role,
      cars: data.cars ? CarResponseMapper.toDetailsListDto(data.cars) : null,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      role: data.role,
      typeAccount: data.typeAccount,
    };
  }

  static toListDto(data: UserListItemResponseDto[]): UserListItemResponseDto[] {
    return data.map(this.toListItemDto);
  }
}
