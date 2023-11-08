import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../database/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { LoginReqDto } from './dto/request/login-req.dto';
import { LoginResDto } from './dto/response/login-res.dto';
import { UserCreateReqDto } from '../user/dto/request/user-req-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRedisClient() private readonly redisClient: RedisClient,
  ) {}

  async findUserOrException(data: any): Promise<UserEntity> {
    console.log(data);
    const user = await this.userRepository.findOneBy({
      id: data.id,
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async generateToken(data: any): Promise<string> {
    return this.jwtService.sign(data);
  }

  async decode(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      new Logger().error(err);
    }
  }

  async register(dto: UserCreateReqDto): Promise<void> {
    dto.password = await bcrypt.hash(dto.password, 7);
    await this.userService.createUser(dto);
    throw new HttpException('User register go to login', HttpStatus.OK);
  }

  async login(dto: LoginReqDto): Promise<LoginResDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.generateToken({
      id: user.id,
      role: user.role,
    });

    await this.redisClient.setEx(token, 50000, token);

    return { token };
  }
}