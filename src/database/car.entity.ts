import { Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';

import { EBrand } from '../modules/car/enum/brand.enum';
import { ECurrency } from '../modules/car/enum/currency.enum';
import { EIsActive } from '../modules/car/enum/isActive.enum';
import { EModel } from '../modules/car/enum/model.enum';
import { EUkraineRegion } from '../modules/car/enum/region.enum';
import { CreatedUpdatedModel } from './common/created-updated.model';
import { UserEntity } from './user.entity';

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

  @Column({
    type: 'text',
    default: '',
  })
  viewCount: string;

  @Column({ enum: EIsActive, default: EIsActive.EXPECTATION })
  isActive: EIsActive;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
