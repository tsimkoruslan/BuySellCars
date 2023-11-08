import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { UserRepository } from '../user/user.repository';
import { badWords } from '../../common/constants/bad-words';
import { EIsActive } from './enum/isActive.enum';
import { CarEntity } from '../../database/car.entity';

@Injectable()
export class CarService {
  private numberOfAttempts = 0;
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
    if (this.numberOfAttempts === 3) {
      dto.isActive = EIsActive.NOT_ACTIVE;
      this.numberOfAttempts = 0;
      return await this.carRepository.save(
        this.carRepository.create({ ...dto, user }),
      );
    }
    await this.checkForBadWords(dto.description, badWords);

    dto.isActive = EIsActive.ACTIVE;
    return await this.carRepository.save(
      this.carRepository.create({ ...dto, user }),
    );
  }

  public async deleteCar(carId: string): Promise<void> {
    const entity = await this.findCarByIdOrException(carId);
    await this.carRepository.remove(entity);
  }

  private async checkForBadWords(
    description: string,
    badWords: string[],
  ): Promise<boolean> {
    description = description.toLowerCase();

    for (const word of badWords) {
      if (description.includes(word)) {
        this.numberOfAttempts++;
        throw new BadRequestException(
          'The description contains invalid words ',
        );
      }
    }

    return true;
  }

  private async findCarByIdOrException(carId: string): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new UnprocessableEntityException('Car entity not found');
    }
    return car;
  }
}
