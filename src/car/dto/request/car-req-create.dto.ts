import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { EBrand } from '../../enum/brand.enum';
import { EModel } from '../../enum/model.enum';
import { Transform } from 'class-transformer';
import { ECurrency } from "../../enum/currency.enum";

export class CarCreateReqDto {
  @IsNumber()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  price: number;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsEnum(EBrand)
  brand: EBrand;

  @Transform(({ value }) => value.trim().toUpperCase())
  @IsEnum(ECurrency)
  currency: ECurrency;

  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
  @IsEnum(EModel)
  model: EModel;

  @IsString()
  description: string;
}
