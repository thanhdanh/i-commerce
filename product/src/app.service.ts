import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestQueryParams } from './interfaces/request_query.interface';
import { CategoryDocument } from './schemas/category.schema';
import { ProductDocument } from './schemas/product.schema';
import { Product } from './schemas/product.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Product.name) private categoryModel: Model<CategoryDocument>
  ) {}

  searchProduct(params: RequestQueryParams) {
    const query = this.productModel.find();
  }
}
