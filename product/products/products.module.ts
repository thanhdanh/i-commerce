import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { Tag, TagSchema } from 'src/schemas/tag.schema';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';


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
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductsModule {}
