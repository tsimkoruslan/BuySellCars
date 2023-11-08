import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class BannedGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const statusBanned = request.body.banned;
    if (statusBanned === false) {
      throw new BadRequestException('You banned');
      return false;
    }
    return true;
  }
}
