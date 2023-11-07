import { IsEnum, IsNumber } from 'class-validator';
import { EBrand } from '../../enum/brand.enum';
import { EModel } from '../../enum/model.enum';

export class CarCreateReqDto {
  @IsNumber()
  year: number;

  @IsEnum(EBrand)
  brand: EBrand;

  @IsEnum(EModel)
  model: EModel;
}
