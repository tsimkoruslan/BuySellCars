import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { JwtConfigModule } from '../../config/jwt/config.module';
import { JwtConfigService } from '../../config/jwt/configuration.service';
import { UserEntity } from '../../database/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

const JwtFactory = (config: JwtConfigService) => ({
  secret: config.secretKey,
  signOptions: {
    expiresIn: config.expiresIn,
  },
});

const JwtRegistrationOptions = {
  imports: [JwtConfigModule],
  useFactory: JwtFactory,
  inject: [JwtConfigService],
};
@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(JwtRegistrationOptions),
    UserModule,
  ],
  providers: [AuthService, BearerStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
