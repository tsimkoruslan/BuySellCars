import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { UserRepository } from '../user/user.repository';
import { EIsActive } from './enum/isActive.enum';
import { CarEntity } from '../../database/car.entity';
import { CarReqUpdateDto } from './dto/request/car-req-update.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carRepository.find();
  }

  public async getCarById(carId: string): Promise<CarEntity> {
    return await this.findCarByIdOrException(carId);
  }
  async createCar(
    dto: CarCreateReqDto,
    userId: string,
  ): Promise<CarDetailsResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not exist');
    }
    switch (dto.isActive) {
      case EIsActive.EXPECTATION:
        dto.isActive = EIsActive.ACTIVE;
        break;
      case EIsActive.NOT_ACTIVE:
        dto.isActive = EIsActive.NOT_ACTIVE;
        break;
    }
    return await this.carRepository.save(
      this.carRepository.create({ ...dto, user }),
    );
  }

  public async updateCar(
    carId: string,
    dto: CarReqUpdateDto,
  ): Promise<CarEntity> {
    const entity = await this.findCarByIdOrException(carId);
    this.carRepository.merge(entity, dto);
    return await this.carRepository.save(entity);
  }
  public async deleteCar(carId: string): Promise<void> {
    const entity = await this.findCarByIdOrException(carId);
    await this.carRepository.remove(entity);
  }

  private async findCarByIdOrException(carId: string): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new UnprocessableEntityException('Car entity not found');
    }
    return car;
  }
}
