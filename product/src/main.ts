import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Redis host', process.env.REDIS_HOST)
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_HOST,
    }
  });
  app.listen(() => console.log('Product service is listening'));
}
bootstrap();
