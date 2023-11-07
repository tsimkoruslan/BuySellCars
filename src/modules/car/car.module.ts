import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../database/car.entity';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), UserModule],
  controllers: [CarController],
  providers: [CarService, CarRepository, UserRepository],
})
export class CarModule {}
