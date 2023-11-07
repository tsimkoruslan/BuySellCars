import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carRepository.find();
  }
  async createCar(dto: CarCreateReqDto): Promise<CarDetailsResDto> {
    return this.carRepository.save(this.carRepository.create(dto));
  }
}
