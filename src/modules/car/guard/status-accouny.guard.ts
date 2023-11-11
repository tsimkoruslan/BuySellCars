import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { ETypeAccount } from '../../user/enum/type-account.enum';

@Injectable()
export class StatusAccountGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.typeAccount === ETypeAccount.PREMIUM) {
      return true;
    }
    throw new BadRequestException('Only PREMIUM');
    return false;
  }
}
