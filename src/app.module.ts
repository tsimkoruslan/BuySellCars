import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfiguration } from './config/postgres/type-orm-configuration';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ModelsModule } from './modules/brand/models.module';
import { CarModule } from './modules/car/car.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { ManagerModule } from './modules/manager/manager.module';
import { S3Module } from './modules/s3/s3.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    AppConfigModule,
    UserModule,
    CarModule,
    AuthModule,
    ManagerModule,
    AdminModule,
    CurrencyModule,
    S3Module,
    ModelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
