import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { admin } from './common/constants/admin.dto';
import { brandsAndModels } from './common/constants/brands-and-models';
import { SwaggerHelper } from './common/helper/swagger.helper';
import { AppConfigService } from './config/app/configuration.service';
import { AdminService } from './modules/admin/admin.service';
import { ModelsService } from './modules/brand/models.service';

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

  const adminService = app.get<AdminService>(AdminService);
  try {
    await adminService.createAdmin(admin);
    new Logger().warn('ROOT ADMIN created.');
  } catch (e) {
    new Logger().warn('ROOT ADMIN created.');
  }
  const brandAndModelService = app.get<ModelsService>(ModelsService);
  try {
    await brandAndModelService.createBrandsAndModels(brandsAndModels);
    new Logger().warn('Brand and model created.');
  } catch (e) {
    new Logger().warn('Brand and model created.');
  }
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfig.port, () => {
    Logger.log(`- the server started on port ${appConfig.port} ᕙ(^▿^-ᕙ)`);
  });
}
void bootstrap();
