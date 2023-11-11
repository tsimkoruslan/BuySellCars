import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { v4 } from 'uuid';

import { AWSConfigService } from '../../config/aws/configuration.service';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor(private readonly awsConfig: AWSConfigService) {
    const configuration: S3ClientConfig = {
      credentials: {
        accessKeyId: this.awsConfig.accessKey,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
      region: this.awsConfig.region,
    };

    this.client = new S3Client(configuration);
  }

  public async uploadFile(
    file: Express.Multer.File,
    carId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, carId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
        ContentLength: file.size,
      }),
    );
    return filePath;
  }

  private buildPath(fileName: string, carId: string): string {
    return `cars/${carId}/${v4()}${path.extname(fileName)}`;
  }
}
