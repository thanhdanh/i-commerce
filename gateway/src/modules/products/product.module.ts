import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductQueryResolver } from './product.resolver';

@Module({
    providers: [
        ProductQueryResolver,
        {
            provide: 'TRANSPORT_SERVICE',
            useFactory: (configService: ConfigService) => {
              return ClientProxyFactory.create({
                transport: Transport.REDIS,
                options: {
                  url: configService.get<string>('REDIS_HOST'),
                }
              });
            },
            inject: [ConfigService],
        },
    ]
})
export class ProductModule { }
