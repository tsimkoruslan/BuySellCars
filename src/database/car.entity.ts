import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { EModel } from '../car/enum/model.enum';
import { EBrand } from '../car/enum/brand.enum';

@Entity('cars')
export class CarEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column({ type: 'enum', enum: EBrand })
  brand: EBrand;

  @Column({ type: 'enum', enum: EModel })
  model: EModel;
}
