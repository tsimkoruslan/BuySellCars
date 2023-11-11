import { EBrand } from '../../enum/brand.enum';
import { ECurrency } from '../../enum/currency.enum';
import { EIsActive } from '../../enum/isActive.enum';
import { EModel } from '../../enum/model.enum';
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
  isActive: EIsActive;
  photo: string;
}

export class CarDetailsCreateResDto {
  id: string;
  year: number;
  brand: EBrand;
  price: number;
  currency: ECurrency;
  model: EModel;
  description: string;
  region: EUkraineRegion;
  isActive: EIsActive;
  photo: string;
  viewCount?: string;
  averagePriceByRegion?: string;
  averagePrice?: string;
  priceAccordingToTheCourse?: string;
}
