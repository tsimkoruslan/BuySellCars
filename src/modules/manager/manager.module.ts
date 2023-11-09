import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../database/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CarController } from '../car/car.controller';
import { CarModule } from '../car/car.module';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { CarService } from "../car/car.service";
import { CarRepository } from "../car/car.repository";

@Module({
  imports: [
    UserModule,
    CarModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    UserService,
    UserRepository,
    UserController,
    CarController,
    CarService,
    CarRepository,
  ],
  exports: [],
})
export class ManagerModule {}
