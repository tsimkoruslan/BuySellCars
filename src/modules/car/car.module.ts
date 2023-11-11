import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';

import { AWSConfigModule } from '../../config/aws/config.module';
import { AWSConfigService } from '../../config/aws/configuration.service';
import { CarEntity } from '../../database/car.entity';
import { AuthModule } from '../auth/auth.module';
import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/currency.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
    UserModule,
    AuthModule,
    CurrencyModule,
  ],
  controllers: [CarController],
  providers: [CarService, CarRepository, UserRepository, CurrencyService],
})
export class CarModule {}
