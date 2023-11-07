import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { CarResponseMapper } from './car.response.mapper';

@ApiTags('Cars')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get list of cars' })
  @Get()
  async getAllCars(): Promise<CarDetailsResDto[]> {
    const result = await this.carService.getAllCars();
    return CarResponseMapper.toDetailsListDto(result);
  }
  @ApiOperation({ summary: 'Create new car' })
  @Post()
  async createCar(
    @Body() body: CarCreateReqDto,
    @Param(':userId') userId: string,
  ): Promise<CarDetailsResDto> {
    const result = await this.carService.createCar(body, userId);
    return CarResponseMapper.toDetailsDto(result);
  }
}
