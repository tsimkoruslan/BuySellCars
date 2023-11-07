import { BadRequestException, Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { UserRepository } from '../user/user.repository';
import { badWords } from '../../common/constants/bad-words';
import { EIsActive } from './enum/isActive.enum';

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
      return await this.carRepository.save(
        this.carRepository.create({ ...dto, user }),
      );
    }
    await this.checkForBadWords(dto.description, badWords);
    this.numberOfAttempts = 0;
    return await this.carRepository.save(
      this.carRepository.create({ ...dto, user }),
    );
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
}
