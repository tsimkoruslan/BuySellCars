import { BadRequestException, Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carRepository.find();
  }
  async createCar(
    dto: CarCreateReqDto,
    userId: string,
  ): Promise<CarDetailsResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not exist');
    }
    return await this.carRepository.save(
      await this.carRepository.create({ ...dto, user }),
    );
  }
}
