import { Controller, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ProductService } from './services/product.service';
import { RequestQueryParams } from './interfaces/request_query.interface';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product_search')
  productsSearch(@Query() query: RequestQueryParams) {
    return this.productService.searchProduct(query);
  }
}
