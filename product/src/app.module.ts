import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'config/configuration';
import { AppController } from './app.controller';
import { CategorySchema, Category } from './schemas/category.schema';
import { ProductSchema, Product } from './schemas/product.schema';
import { Tag, TagSchema } from './schemas/tag.schema';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_uri'),
      }),
      inject: [ConfigService],
    }),
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
  providers: [ProductService],
})
export class AppModule {}
