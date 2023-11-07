import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { EModel } from '../modules/car/enum/model.enum';
import { EBrand } from '../modules/car/enum/brand.enum';
import { Max, Min } from 'class-validator';
import { ECurrency } from '../modules/car/enum/currency.enum';
import { EUkraineRegion } from '../modules/car/enum/region.enum';
import { UserEntity } from './user.entity';
import { JoinColumn } from 'typeorm/browser';

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

  @Column({ enum: EUkraineRegion })
  region: EUkraineRegion;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
