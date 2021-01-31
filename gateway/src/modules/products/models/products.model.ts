import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BrandEnum, ColorEnum } from 'src/constants';
import { Category } from './category.model';

registerEnumType(BrandEnum, {
    name: 'BrandEnum',
});

registerEnumType(ColorEnum, {
    name: 'ColorEnum',
});


@ObjectType()
export class Product {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Int)
    price: number = 0;
    
    @Field(type => BrandEnum)
    brand: BrandEnum;

    @Field(type => ColorEnum)
    color: ColorEnum;

    @Field()
    categoryId: number;

    @Field()
    creationDate: Date;

    @Field(type => Category)
    category: Category;
}