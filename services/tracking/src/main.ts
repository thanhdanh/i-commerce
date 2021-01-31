import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log( process.env)
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_HOST,
    }
  });
  app.listen(() => console.log('Tracking service is listening'));
}
bootstrap();
