import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarDetailsCreateResDto, CarDetailsResDto } from "./dto/response/car-details-res.dto";

export class CarResponseMapper {
  static toDetailsListDto(data: CarCreateReqDto[]): CarDetailsResDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: CarDetailsResDto): CarDetailsResDto {
    return {
      id: data.id,
      year: data.year,
      price: data.price,
      currency: data.currency,
      region: data.region,
      model: data.model,
      brand: data.brand,
      isActive: data.isActive,
      description: data.description,
    };
  }

  static toAllDetailsDto(data: CarDetailsCreateResDto): CarDetailsCreateResDto {
    return {
      id: data.id,
      year: data.year,
      price: data.price,
      currency: data.currency,
      region: data.region,
      model: data.model,
      brand: data.brand,
      isActive: data.isActive,
      description: data.description,
      averagePriceByRegion: data.averagePriceByRegion,
      viewCount: data.viewCount,
      averagePrice: data.averagePrice,
    };
  }
}
