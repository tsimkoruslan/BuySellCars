import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helper/swagger.helper';
import { AppConfigService } from './config/app/configuration.service';

const environment = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('buySellCars')
    .setDescription('Platform for selling and buying cars 🏎')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfig.port, () => {
    Logger.log(`- the server started on port ${appConfig.port} ᕙ(^▿^-ᕙ)`);
  });
}
void bootstrap();
