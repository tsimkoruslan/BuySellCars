import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { CarResponseMapper } from './car.response.mapper';
import { AuthGuard } from '@nestjs/passport';
import { CarReqUpdateDto } from './dto/request/car-req-update.dto';
import { BadWordsValidation } from "../auth/guard/bad-words-validation.guard";

@ApiTags('Cars')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get list of cars' })
  @Get()
  async getAllCars(): Promise<CarDetailsResDto[]> {
    const result = await this.carService.getAllCars();
    return CarResponseMapper.toDetailsListDto(result);
  }

  @ApiOperation({ summary: 'Get car by id' })
  @Get(':carId')
  async getCarById(@Param('carId') carId: string): Promise<CarDetailsResDto> {
    const result = await this.carService.getCarById(carId);
    return CarResponseMapper.toDetailsDto(result);
  }
  @ApiOperation({ summary: 'Create new car' })
  @UseGuards(BadWordsValidation)
  @Post(':userId')
  async createCar(
    @Body() body: CarCreateReqDto,
    @Param('userId') userId: string,
  ): Promise<CarDetailsResDto> {
    const result = await this.carService.createCar(body, userId);
    return CarResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update car by id' })
  @Put(':carId')
  async updateCar(
    @Param('carId') carId: string,
    @Body() body: CarReqUpdateDto,
  ): Promise<CarDetailsResDto> {
    const result = await this.carService.updateCar(carId, body);
    return CarResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete car by id' })
  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string): Promise<void> {
    await this.carService.deleteCar(carId);
  }
}
