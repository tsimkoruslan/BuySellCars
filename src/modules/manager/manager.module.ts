import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../car/car.module';
import { CurrencyModule } from '../currency/currency.module';
import { UserModule } from '../user/user.module';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [CurrencyModule, UserModule, CarModule, AuthModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [],
})
export class ManagerModule {}
