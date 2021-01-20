import { FilterableField } from '@nestjs-query/query-graphql';

export class QueryProductDto {
    @FilterableField()
    name: string;

    
}