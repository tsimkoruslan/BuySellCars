import { EBrand } from '../../enum/brand.enum';
import { EModel } from '../../enum/model.enum';
import { ECurrency } from '../../enum/currency.enum';
import { EUkraineRegion } from '../../enum/region.enum';
export class CarDetailsResDto {
  id: string;
  year: number;
  brand: EBrand;
  price: number;
  currency: ECurrency;
  model: EModel;
  description: string;
  region: EUkraineRegion;
  viewCount?: number;
}
