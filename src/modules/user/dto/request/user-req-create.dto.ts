import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsAllowedRole } from '../../../../common/decorators/role-validator.dto';
import { ERole } from '../../../../common/enum/role.enum';

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
  @IsString()
  @IsAllowedRole({ message: 'Invalid role value' })
  role: ERole;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
