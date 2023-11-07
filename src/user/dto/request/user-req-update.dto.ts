import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ERoleBasic } from '../../enum/role.enum';

export class UserUpdateReqDto {
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEnum(ERoleBasic)
  role?: ERoleBasic;
}
