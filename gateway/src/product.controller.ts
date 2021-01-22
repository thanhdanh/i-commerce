import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
    ) { }

    @Get()
    searchProducts() {

    }
}