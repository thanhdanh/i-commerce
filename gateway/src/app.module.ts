import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './modules/health-check/health-check.controller';
import { ProductQueryResolver } from './modules/products/product.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    ClientsModule.register([
      
    ]),
  ],
  controllers: [HealthController],
  providers: [
    ProductQueryResolver,
    {
      provide: 'TRACKING_SERVICE',
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
    {
      provide: 'PRODUCT_SERVICE',
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
export class AppModule {}
