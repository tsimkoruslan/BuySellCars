import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfiguration } from './config/postgres/type-orm-configuration';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { ManagerModule } from './modules/manager/manager.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    AppConfigModule,
    UserModule,
    CarModule,
    AuthModule,
    ManagerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
