import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { ERoleBasic } from '../modules/user/enum/role.enum';
import { ETypeAccount } from '../modules/user/enum/type-account.enum';
import { CarEntity } from './car.entity';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'enum', enum: ERoleBasic })
  role: ERoleBasic;

  @Column({ type: 'enum', enum: ETypeAccount, default: ETypeAccount.BASIC })
  typeAccount: ETypeAccount;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
