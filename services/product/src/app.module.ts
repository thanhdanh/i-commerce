import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [
    ProductsController
  ],
  providers: [
    PrismaService,
    ProductService
  ]
})
export class AppModule {}
