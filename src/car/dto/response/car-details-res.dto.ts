import { EBrand } from '../../enum/brand.enum';
import { EModel } from '../../enum/model.enum';
import { ECurrency } from '../../enum/currency.enum';

export class CarDetailsResDto {
  year: number;
  brand: EBrand;
  price: number;
  currency: ECurrency;
  model: EModel;
  description: string;
}
