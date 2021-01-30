import { Controller, HttpStatus, Logger, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckResultDto, ServiceStatus } from 'src/dto/health-result.dto';
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

  @MessagePattern('product_healthz')
  async checkHealth(timeout: number): Promise<HealthCheckResultDto> {
    const result = new HealthCheckResultDto('product_service', ServiceStatus.UP);
    const db = new HealthCheckResultDto('product_db', ServiceStatus.DOWN);
    try {
      if (await this.productService.checkDB(timeout)) {
        db.status = ServiceStatus.UP;
      }
    } catch (error) {
      db.status = ServiceStatus.DOWN;
      db.error = new Error(error).message;
    }
    result.services.push(db);
    return result;
  }
}
