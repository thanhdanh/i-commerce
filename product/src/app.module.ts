import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorySchema, Category } from './schemas/category.schema';
import { ProductSchema, Product } from './schemas/product.schema';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
