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

  @Field({ nullable: true })
  search: string;

  @Field({ nullable: true })
  filterBy: string;

  @Field({ nullable: true })
  orderBy: string;
}