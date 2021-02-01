import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, Length, MaxLength, Min } from 'class-validator';
import { BrandEnum, ColorEnum } from 'src/constants';

@InputType()
export class NewProductInput {
    @Field()
    @MaxLength(100)
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field(type => Int)
    @Min(0)
    price: number = 0;

    @IsEnum(ColorEnum)
    @Field({ nullable: true })
    color: ColorEnum;

    @IsEnum(BrandEnum)
    @Field({ nullable: true })
    brand: BrandEnum;

    @Field()
    categoryName: string;
}