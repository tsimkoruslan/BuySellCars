import { Module } from '@nestjs/common';
import { RedisModule } from '@webeleon/nestjs-redis';

import { S3Module } from '../s3/s3.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    S3Module, //TODO
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
