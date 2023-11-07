import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { EModel } from '../car/enum/model.enum';
import { EBrand } from '../car/enum/brand.enum';
import { Max, Min } from 'class-validator';
import { ECurrency } from "../car/enum/currency.enum";

@Entity('cars')
export class CarEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ enum: ECurrency })
  currency: ECurrency;

  @Column({ enum: EBrand })
  brand: EBrand;

  @Column({ enum: EModel })
  model: EModel;

  @Column()
  description: string;
}
