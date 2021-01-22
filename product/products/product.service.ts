import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createQueryBuilder } from 'src/utils';
import { RequestQueryParams } from 'src/interfaces/request_query.interface';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) public productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async searchProduct(params: RequestQueryParams) {
    const queryBuilder = createQueryBuilder(this.productModel, params);
    const result = await queryBuilder.exec();

    return result;
  }
}
