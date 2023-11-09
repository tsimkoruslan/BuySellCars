import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from '../../database/car.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), UserModule, AuthModule],
  controllers: [CarController],
  providers: [CarService, CarRepository, UserRepository],
})
export class CarModule {}
