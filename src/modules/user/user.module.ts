import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '@webeleon/nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
