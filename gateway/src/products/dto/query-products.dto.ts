import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class ProductsArgs {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field({ nullable: true, description: "ex: Samsung" })
  search: string;

  @Field({ nullable: true, description: "ex: {price:{lte: 10,gte:100000}}" })
  filterBy: string;

  @Field({ nullable: true })
  orderBy: string;
}