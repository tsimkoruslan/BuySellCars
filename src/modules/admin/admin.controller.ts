import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { RoleGuard } from '../../common/guards/role.guard';

@ApiTags('Admin')
@RoleDecorator(ERole.ADMIN)
@UseGuards(RoleGuard)
@Controller('admin')
export class AdminController {
  constructor() {}

  @ApiOperation({ summary: 'Create manager' })
  @Post()
  async createManager() {}
}
