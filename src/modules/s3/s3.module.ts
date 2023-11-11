import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { AWSConfigService } from '../../config/aws/configuration.service';
import { S3Service } from './s3.service';

@Module({
  imports: [AWSConfigModule],
  providers: [S3Service, AWSConfigService],
})
export class S3Module {}
