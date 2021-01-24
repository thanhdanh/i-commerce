import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BrandEnum, ColorEnum } from 'src/constants';

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

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Int)
    price: number;
    
    @Field(type => BrandEnum)
    brand?: BrandEnum;

    @Field(type => ColorEnum)
    color?: ColorEnum;
}