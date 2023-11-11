import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async blockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    user.block = true;
    await this.userRepository.save(user);
    throw new HttpException('User block', HttpStatus.OK);
  }

  async unblockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    user.block = false;
    await this.userRepository.save(user);
    throw new HttpException('User unblock!', HttpStatus.OK);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
