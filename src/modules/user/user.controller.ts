import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { BlockGuard } from '../../common/guards/banned.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { UserUpdateReqDto } from './dto/request/user-req-update.dto';
import {
  UserDetailsResDto,
  UserListItemResponseDto,
} from './dto/response/user-details-res.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard(), RoleGuard, BlockGuard)
@RoleDecorator(ERole.BUYER, ERole.SELLER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get list of users' })
  @Get()
  async getAllUsers(): Promise<UserListItemResponseDto[]> {
    const result = await this.userService.getAllUsers();
    return UserResponseMapper.toListDto(result);
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
