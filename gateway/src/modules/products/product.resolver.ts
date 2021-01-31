import { Inject, UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Info, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { Product } from "src/modules/products/models/products.model";
import { isNil } from "../../utils/common.util";
import { timeout } from 'rxjs/operators';
import { NewProductInput } from "./dto/create-product.dto";
import { ProductsArgs } from "./dto/query-products.dto";
import { TrackingInterceptor } from "src/interceptions/tracking.interception";
import { UpdateProductInput } from "./dto/update-product.dto";
import { GqlAuthGuard } from "../auth/gql-auth.guard";

@Resolver(() => Product)
export class ProductQueryResolver {
    constructor(
        @Inject('TRANSPORT_SERVICE') private readonly productServiceClient: ClientProxy,
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

        return result;
    }
    
    @Query(returns => Product, { name: 'productDetail', nullable: true })
    @UseInterceptors(TrackingInterceptor)
    async getProductDetail(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Product> {
        const product = await this.productServiceClient.send('query_product_detail', id).toPromise();
        return product;
    }

    @Mutation(returns => Product)
    @UseGuards(GqlAuthGuard)
    async addProduct(
        @Args('data') newProductData: NewProductInput,
    ): Promise<Product> {
        const product = await this.productServiceClient.send('add_product', newProductData).toPromise();
        return product;
    }

    @Mutation(returns => Product, { name: 'updateProduct' })
    @UseGuards(GqlAuthGuard)
    async updateProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateProductData') updateData: UpdateProductInput,
    ) {
        const product = await this.productServiceClient.send('update_product', { id, updateData }).toPromise();
        return product;
    }

    @Mutation(returns => Number, { name: 'deleteProduct' })
    @UseGuards(GqlAuthGuard)
    async deleteProduct(
        @Args('id', { type: () => Int }) id: number
    ): Promise<number>
    {
        const productID = await this.productServiceClient.send('delete_product', id).toPromise();
        return productID;
    }
}