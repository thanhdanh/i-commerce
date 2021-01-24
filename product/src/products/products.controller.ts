import { Controller, HttpStatus, Logger, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IQuery } from 'src/interfaces/common.interface';

import { ProductService } from './product.service';

@Controller()
export class ProductsController {
  private readonly logger = new Logger('Product Controller')
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('products_search')
  async productsSearch(query: IQuery) {
    try {
      this.logger.debug('Have requrest to search products')
      this.logger.debug(query)
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
