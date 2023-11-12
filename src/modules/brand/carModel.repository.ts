import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarModel } from '../../database/car.Models.entity';

@Injectable()
export class CarModelRepository extends Repository<CarModel> {
  constructor(private readonly dataSource: DataSource) {
    super(CarModel, dataSource.manager);
  }
}
