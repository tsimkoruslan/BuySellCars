import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateReqDto } from './dto/request/user-req-create.dto';
import { UserDetailsResDto } from './dto/response/user-details-res.dto';
import { UserUpdateReqDto } from './dto/request/user-req-update.dto';
import { UserResponseMapper } from './user.response.mapper';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list of users' })
  @Get()
  async getAllUsers(): Promise<UserDetailsResDto[]> {
    return await this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Create new user' })
  @Post()
  async createUser(@Body() body: UserCreateReqDto): Promise<UserDetailsResDto> {
    const result = await this.userService.createUser(body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update user' })
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateReqDto,
  ): Promise<UserDetailsResDto> {
    return await this.userService.updateUser(userId, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
