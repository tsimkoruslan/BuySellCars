import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERoleBasic } from '../../enum/role.enum';

export class UserUpdateReqDto {
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  userName?: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsOptional()
  @IsEnum(ERoleBasic)
  role?: ERoleBasic;
}
