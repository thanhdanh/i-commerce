import { Module } from '@nestjs/common';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [
    ProductsController
  ],
  providers: [
    PrismaService,
    ProductService
  ]
})
export class AppModule {}
