import { Brand, Color } from "@prisma/client";
import { IsOptional, Length, MaxLength, Min } from "class-validator";

export class UpdateProductInput {
    @IsOptional()
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @Length(30, 255)
    description?: string;

    @IsOptional()
    @Min(0)
    price?: number;

    @IsOptional()
    color?: Color;

    @IsOptional()
    brand?: Brand;

    @IsOptional()
    categoryId?: number;
}