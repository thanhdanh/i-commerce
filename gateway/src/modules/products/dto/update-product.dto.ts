import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";
import { IsOptional, Length, MaxLength, Min } from "class-validator";
import { BrandEnum, ColorEnum } from "src/constants";

registerEnumType(ColorEnum, {
    name: 'ColorEnum',
});

@InputType()
export class UpdateProductInput {
    @Field({ nullable: true })
    @IsOptional()
    @MaxLength(100)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field(type => Int,  { nullable: true })
    @IsOptional()
    @Min(0)
    price?: number;

    @Field(type => ColorEnum, { nullable: true })
    @IsOptional()
    color?: ColorEnum;

    @Field(type => BrandEnum, { nullable: true })
    @IsOptional()
    brand?: BrandEnum;

    @Field({ nullable: true })
    @IsOptional()
    categoryId?: number;
}