import { Inject, UseInterceptors } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { Product } from "src/products/models/products.model";
import { isNil } from "../../utils/common.util";
import { timeout } from 'rxjs/operators';
import { NewProductInput } from "../dto/create-product.dto";
import { ProductsArgs } from "../dto/query-products.dto";
import { TrackingInterceptor } from "src/interceptions/tracking.interception";

@Resolver(() => Product)
export class ProductQueryResolver {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
    ) {}
    
    @Query(() => [Product], { name: 'products'})
    @UseInterceptors(TrackingInterceptor)
    async getProducts(
        @Args() productsArgs: ProductsArgs
    ) {
        const query: any = {
            where: {
                visible: true,
            },
            orderBy: {}
        }

        if (!isNil(productsArgs.search)) {
            query.where = {
                ...query.where,
                OR: [
                    { name: { contains: productsArgs.search } },
                    { description: { contains: productsArgs.search } }
                ]
            }
        }
        
        if (!isNil(productsArgs.filterBy)) {
            console.log(productsArgs.filterBy)
            query.where = {
                ...query.where,
                ...JSON.parse(productsArgs.filterBy),
            }
        }

        if (!isNil(productsArgs.orderBy)) {
            if (productsArgs.orderBy.trim().charAt(0) === '-') {
                query.orderBy[productsArgs.orderBy.trim().substr(1)] = 'desc'
            } else {
                query.orderBy[productsArgs.orderBy.trim()] = 'asc';
            }
        }

        if (!isNil(productsArgs.skip)) {
            query.skip = +productsArgs.skip;
        }

        if (!isNil(productsArgs.take)) {
            query.limit = +productsArgs.take;
        }

        query.where = JSON.stringify(query.where);
        query.orderBy = JSON.stringify(query.orderBy);

        const result = await this.productServiceClient.send('query_products', query).pipe(timeout(5000)).toPromise();
        console.log('result', result)
        return result;
    }
    
    @Query(returns => Product, { name: 'productDetail'})
    async getProductDetail(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Product> {
        const product = await this.productServiceClient.send('query_product_detail', id).toPromise();
        return product;
    }

    @Mutation(returns => Product)
    async addProduct(
        @Args('newProductData') newProductData: NewProductInput,
    ): Promise<Product> {
        const product = await this.productServiceClient.send('add_product', newProductData).toPromise();
        return product;
    }
}