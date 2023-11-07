import { CarEntity } from '../../database/car.entity';
import { CarDetailsResDto } from './dto/response/car-details-res.dto';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';

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
      description: data.description,
    };
  }
}
