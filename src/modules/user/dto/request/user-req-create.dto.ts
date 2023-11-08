import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERoleBasic } from '../../enum/role.enum';

export class UserCreateReqDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsEnum(ERoleBasic)
  role: ERoleBasic;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
