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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateReqDto } from './dto/request/user-req-create.dto';
import {
  UserDetailsResDto,
  UserListItemResponseDto,
} from './dto/response/user-details-res.dto';
import { UserUpdateReqDto } from './dto/request/user-req-update.dto';
import { UserResponseMapper } from './user.response.mapper';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list of users' })
  @Get()
  async getAllUsers(): Promise<UserListItemResponseDto[]> {
    const result = await this.userService.getAllUsers();
    return UserResponseMapper.toListDto(result);
  }

  //admin
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
    const result = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(AuthGuard())
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResDto> {
    const result = await this.userService.getUserById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
