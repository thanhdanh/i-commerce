import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import configuration from 'src/config/configuration';
import { ProductsController } from './product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    })
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('productsService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
