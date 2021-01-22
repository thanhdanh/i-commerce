import { Controller, HttpStatus, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ProductService } from './services/product.service';
import { RequestQueryParams } from './interfaces/request_query.interface';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product_search')
  async productsSearch(@Query() query: RequestQueryParams) {
    try {
      const result = await this.productService.searchProduct(query);
      return {
        status: HttpStatus.OK,
        data: result,
      };
    } catch (ex) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: ex.message,
      };
    }
  }
}
