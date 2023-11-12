import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { S3Service } from './s3.service';

@Module({
  imports: [AWSConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
