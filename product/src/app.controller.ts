import { Controller, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { RequestQueryParams } from './interfaces/request_query.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('product_search')
  productsSearch(@Query() query: RequestQueryParams) {
    return this.appService.searchProduct(query);
  }
}
