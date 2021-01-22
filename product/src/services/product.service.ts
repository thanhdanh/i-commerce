import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestQueryParams } from '../interfaces/request_query.interface';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { ProductDocument } from '../schemas/product.schema';
import { Product } from '../schemas/product.schema';
import { createQueryBuilder } from 'src/utils';

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
