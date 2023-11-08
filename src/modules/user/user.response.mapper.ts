import {
  UserDetailsResDto,
  UserListItemResponseDto,
} from './dto/response/user-details-res.dto';
import { CarResponseMapper } from '../car/car.response.mapper';
import { UserCreateReqDto } from './dto/request/user-req-create.dto';
import { UserEntity } from '../../database/user.entity';

export class UserResponseMapper {
  static toDetailsRegisterDto(data: UserCreateReqDto) {
    return {
      email: data.email,
    };
  }
  static toDetailsListDto(data: UserDetailsResDto[]): UserDetailsResDto[] {
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
      banned: data.banned,
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
      banned: data.banned,
      typeAccount: data.typeAccount,
    };
  }

  static toListDto(data: UserListItemResponseDto[]): UserListItemResponseDto[] {
    return data.map(this.toListItemDto);
  }
}
