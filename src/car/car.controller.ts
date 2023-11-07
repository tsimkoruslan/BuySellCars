import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';

@ApiTags('Cars')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get list of cars' })
  @Get()
  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carService.getAllCars();
  }
  @ApiOperation({ summary: 'Create new car' })
  @Post()
  async createCar(@Body() body: CarCreateReqDto): Promise<CarDetailsResDto> {
    return await this.carService.createCar(body);
  }
}
