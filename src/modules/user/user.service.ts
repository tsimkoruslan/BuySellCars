import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../../database/user.entity';
import { S3Service } from '../s3/s3.service';
import { UserCreateReqDto } from './dto/request/user-req-create.dto';
import { UserUpdateReqDto } from './dto/request/user-req-update.dto';
import { UserDetailsResDto } from './dto/response/user-details-res.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service, //TODO
  ) {}

  async getAllUsers(): Promise<UserDetailsResDto[]> {
    return await this.userRepository.find();
  }
  async createUser(dto: UserCreateReqDto): Promise<UserDetailsResDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (user) {
      throw new BadRequestException('User already exist');
    }
    return await this.userRepository.save(this.userRepository.create(dto));
  }

  async updateUser(
    userId: string,
    dto: UserUpdateReqDto,
  ): Promise<UserDetailsResDto> {
    const entity = await this.findUserByIdOrException(userId);

    return await this.userRepository.save(
      await this.userRepository.merge(entity, dto),
    );
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });
  }

  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userId);
    await this.userRepository.remove(entity);
    throw new HttpException('User delete!', HttpStatus.OK);
  }
}
