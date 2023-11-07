import { EBrand } from '../../enum/brand.enum';
import { EModel } from '../../enum/model.enum';

export class CarDetailsResDto {
  year: number;
  brand: EBrand;
  model: EModel;
}
