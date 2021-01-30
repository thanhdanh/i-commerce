import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as cors from 'cors';
import * as compression from 'compression';

import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter())

  app.use(cors());
  app.use(compression());

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_HOST, 
      retryAttempts: 5,
      retryDelay: 1000 
    }
  });

  await app.listen(3000);
}

bootstrap();
