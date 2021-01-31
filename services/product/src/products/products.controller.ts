import { Controller, HttpStatus, Logger, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthCheckResultDto, ServiceStatus } from 'src/dto/health-result.dto';
import { IQuery } from 'src/interfaces/common.interface';

import { ProductService } from './product.service';

@Controller()
export class ProductsController {
  private readonly logger = new Logger('Product Controller')
  constructor(private readonly productService: ProductService) { }

  @MessagePattern('query_products')
  async productsSearch(query: IQuery) {
    this.logger.debug('Have requrest to search products')
    this.logger.debug(query)
    return this.productService.searchProduct(query);
  }

  @MessagePattern('query_product_detail')
  async getDetail(id: number) {
    this.logger.debug('Have requrest to query product detail')
    return this.productService.getProductDetail(id);
  }

  @MessagePattern('add_product')
  async productsAdd(@Payload() data: any) {
    this.logger.debug('Have requrest to add product')
    return this.productService.addProduct(data);
  }

  @MessagePattern('update_product')
  async update(@Payload() info: any) {
    this.logger.debug('Have requrest to query product detail')
    return this.productService.updateProduct(info.id, info.data);
  }

  @MessagePattern('product_healthz')
  async checkHealth(timeout: number): Promise<HealthCheckResultDto> {
    const result = new HealthCheckResultDto('product_service', ServiceStatus.UP);
    const db = new HealthCheckResultDto('product_db', ServiceStatus.DOWN);
    try {
      await this.productService.checkDB(timeout)
      db.status = ServiceStatus.UP;
    } catch (error) {
      db.status = ServiceStatus.DOWN;
      db.error = new Error(error).message;
    }
    result.services.push(db);

    const { heapUsed } = process.memoryUsage();
    result.memoryUsage = heapUsed;

    return result;
  }
}
