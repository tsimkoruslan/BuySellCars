import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarBrand } from '../../database/car.Brand.entity';
import { CarModel } from '../../database/car.Models.entity';
import { CarBrandRepository } from './carBrand.repository';
import { CarModelRepository } from './carModel.repository';
import { ModelsService } from './models.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrand, CarModel])],
  controllers: [],
  providers: [ModelsService, CarModelRepository, CarBrandRepository],
  exports: [ModelsService, CarModelRepository, CarBrandRepository],
})
export class ModelsModule {}
