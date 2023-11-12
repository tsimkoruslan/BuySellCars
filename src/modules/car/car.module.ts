import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from '../../database/car.entity';
import { AuthModule } from '../auth/auth.module';
import { ModelsModule } from '../brand/models.module';
import { CurrencyModule } from '../currency/currency.module';
import { S3Module } from '../s3/s3.module';
import { UserModule } from '../user/user.module';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
    UserModule,
    AuthModule,
    CurrencyModule,
    ModelsModule,
    S3Module,
  ],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService, CarRepository],
})
export class CarModule {}
