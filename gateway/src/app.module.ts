import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthModule } from './modules/auth/auth.module';
import { HealthController } from './modules/health-check/health-check.controller';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    AuthModule,
    ProductModule
  ],
  controllers: [HealthController],
  providers: [
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
export class AppModule { }
