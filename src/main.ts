import {AllExceptionsFilter} from '@error/all-exception.filter';
import {ValidationPipe} from '@nestjs/common';
import {HTTP_SERVER_REF, NestFactory} from '@nestjs/core';
import * as dotenv from 'dotenv';
import {AppModule} from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  await app.listen(3000);
}

bootstrap();
