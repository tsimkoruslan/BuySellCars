import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { ERoleBasic } from '../user/enum/role.enum';
import { ETypeAccount } from '../user/enum/type-account.enum';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: ERoleBasic })
  role: ERoleBasic;

  @Column({ type: 'enum', enum: ETypeAccount, default: ETypeAccount.BASIC })
  typeAccount: ETypeAccount;
}
