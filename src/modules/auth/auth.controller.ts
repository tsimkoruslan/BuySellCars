import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserCreateReqDto } from '../user/dto/request/user-req-create.dto';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/request/login-req.dto';
import { LoginResDto } from './dto/response/login-res.dto';
import { LogoutGuard } from './guard/logout.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register new user' })
  @Post('register')
  async register(@Body() body: UserCreateReqDto): Promise<void> {
    await this.authService.register(body);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(@Body() body: LoginReqDto): Promise<LoginResDto> {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard(), LogoutGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Delete('logout')
  async logout(): Promise<void> {
    throw new HttpException('User logout', HttpStatus.OK);
  }
}
