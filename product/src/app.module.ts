import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductsModule
  ],
})
export class AppModule {
  constructor() {
    console.log('process.env.MONGO_URI', process.env.MONGO_URI)
  }
}
