import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './health-check/health-check.controller';
import { ProductQueryResolver } from './products/resolvers/product.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE', 
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_HOST,
        }
      },
      {
        name: 'TRACKING_SERVICE', 
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_HOST,
        }
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [
    ProductQueryResolver
  ]
})
export class AppModule {}
