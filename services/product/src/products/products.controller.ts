import { Controller, HttpStatus, Logger, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IQuery } from 'src/interfaces/common.interface';

import { ProductService } from './product.service';

@Controller()
export class ProductsController {
  private readonly logger = new Logger('Product Controller')
  constructor(private readonly productService: ProductService) { }

  @MessagePattern('products_search')
  async productsSearch(query: IQuery) {
    this.logger.debug('Have requrest to search products')
    this.logger.debug(query)
    return this.productService.searchProduct(query);
  }

  @MessagePattern('product_add')
  async productsAdd(data: any) {
    this.logger.debug('Have requrest to add product')
    return this.productService.addProduct(data);
  }

  @MessagePattern('health')
  async checkHealth(timeout: number) {
    const result = {
      service_status: 'up',
      db_status: 'down'
    }

    try {
      if (await this.productService.checkDB(timeout)) {
        result.db_status = 'up';
      }
    } catch (error) {
      result.db_status = 'down';
    }
    
    return result;
  }
}
