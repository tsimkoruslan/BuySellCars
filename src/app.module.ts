import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config/postgres/type-orm-configuration';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    AppConfigModule,
    UserModule,
    CarModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
