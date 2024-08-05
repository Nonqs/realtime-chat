import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  })
  app.use(cookieParser())
  app.use('/uploads', express.static(join(__dirname, '..', "..", 'uploads')));
  await app.listen(3000)
}
bootstrap();
