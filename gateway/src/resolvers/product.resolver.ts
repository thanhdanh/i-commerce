import { Inject } from "@nestjs/common";
import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { Product } from "src/models/products.model";
import { isNil } from "../utils/common.util";
import { timeout } from 'rxjs/operators';

@Resolver(() => Product)
export class ProductQueryResolver {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
    ) {}
    
    @Query(returns => [Product], { name: 'products'})
    async getProducts(
        @Args('search', { nullable: true }) searchString?: string,
        @Args('filterBy', { nullable: true }) filterBy?: string,
        @Args('orderBy', { nullable: true }) orderBy?: string,
        @Args('skip', { nullable: true }) skip?: number,
        @Args('limit', { nullable: true }) limit?: number,
    ) {
        const query: any = {
            where: {
                visible: true,
            },
            orderBy: {}
        }

        if (!isNil(searchString)) {
            query.where = {
                ...query.where,
                where: {
                    OR: [
                        { name: { contains: searchString } },
                        { description: { contains: searchString } }
                    ]
                }
            }
        }
        
        if (!isNil(filterBy)) {
            query.where = {
                ...query.where,
                ...JSON.parse(filterBy),
            }
        }

        if (!isNil(orderBy)) {
            if (orderBy.trim().charAt(0) === '-') {
                query.orderBy[orderBy.trim().substr(1)] = 'desc'
            } else {
                query.orderBy[orderBy.trim()] = 'asc';
            }
        }

        if (!isNil(skip)) {
            query.skip = +skip;
        }

        if (!isNil(limit)) {
            query.limit = +limit;
        }

        query.where = JSON.stringify(query.where);
        query.orderBy = JSON.stringify(query.orderBy);

        const products = await this.productServiceClient.send('products_search', query).pipe(timeout(5000)).toPromise();
        console.log('Products', products)
        return products.data
    }
}