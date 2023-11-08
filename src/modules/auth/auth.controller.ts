import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/request/login-req.dto';
import { LoginResDto } from './dto/response/login-res.dto';
import { UserCreateReqDto } from '../user/dto/request/user-req-create.dto';

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
}
