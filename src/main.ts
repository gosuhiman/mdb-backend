import * as dotenv from 'dotenv';
dotenv.config();

import {AllExceptionsFilter} from '@error/all-exception.filter';
import {ValidationPipe} from '@nestjs/common';
import {HTTP_SERVER_REF, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  await app.listen(3000);
}

bootstrap();
