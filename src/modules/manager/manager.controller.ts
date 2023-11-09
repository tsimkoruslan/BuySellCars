import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { BlockGuard } from '../../common/guards/banned.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { CarController } from '../car/car.controller';
import { CarDetailsResDto } from '../car/dto/response/car-details-res.dto';
import { UserListItemResponseDto } from '../user/dto/response/user-details-res.dto';
import { UserController } from '../user/user.controller';
import { ERole } from '../../common/enum/role.enum';
import { ManagerService } from './manager.service';
import { UserService } from "../user/user.service";

@ApiBearerAuth()
@ApiTags('Manager')
@RoleDecorator(ERole.MANAGER, ERole.ADMIN)
@UseGuards(AuthGuard(), RoleGuard, BlockGuard)
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly userController: UserController,
    private readonly carController: CarController,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Block user' })
  @Delete(':userId')
  async blockUser(@Param('userId') userId: string): Promise<void> {
    await this.managerService.blockUser(userId);
  }

  @ApiOperation({ summary: 'Unblock user' })
  @Put(':userId')
  async unblockUser(@Param('userId') userId: string): Promise<void> {
    await this.managerService.unblockUser(userId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get('users')
  async getAllUsers(): Promise<UserListItemResponseDto[]> {
    return await this.userController.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserListItemResponseDto> {
    return await this.userController.getUserById(userId);
  }
  @ApiOperation({ summary: 'Get all cars' })
  @Get('cars')
  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carController.getAllCars();
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('user/:userId')
  async deleteUserById(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }

  @ApiOperation({ summary: 'Get car by id' })
  @Get('car/:carId')
  async getCarById(@Param('carId') carId: string): Promise<CarDetailsResDto> {
    return await this.carController.getCarById(carId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete car by Id' })
  @Delete('car/:carId')
  async deleteCarById(@Param('carId') carId: string): Promise<void> {
    await this.carController.deleteCar(carId);
  }
}
