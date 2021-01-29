import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthCheckModule } from './health-check/health-check.module';
import { ProductQueryResolver } from './products/resolvers/product.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
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
    ]),
    HealthCheckModule
  ],
  providers: [
    ProductQueryResolver
  ]
})
export class AppModule {}
