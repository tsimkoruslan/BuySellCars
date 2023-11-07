import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERoleBasic } from '../../enum/role.enum';

export class UserCreateReqDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsEnum(ETypeAccount)
  // typeAccount?: ETypeAccount.BASIC;

  @IsEnum(ERoleBasic)
  role: ERoleBasic;
}
