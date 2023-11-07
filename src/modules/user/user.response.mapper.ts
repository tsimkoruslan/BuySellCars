import { UserDetailsResDto } from './dto/response/user-details-res.dto';
import { CarResponseMapper } from '../car/car.response.mapper';

export class UserResponseMapper {
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
}
