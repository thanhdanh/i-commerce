import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

export enum Brand {
    Samsung = 'Samsung',
    Apple = 'Apple',
    Gigabyte = 'Gigabyte',
    Corsair = 'Corsair',
    Intel = 'Intel',
    Adata = 'Adata'
}

@Schema({ 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})
export class Product {
    @Prop({
        unique: true,
        required: true,
        length: 10
    })
    code: string;

    @Prop({ required: true, minlength: 10 })
    name: string;

    @Prop({
        required: true,
        default: 0
    })
    price: number;

    @Prop()
    color: string;

    @Prop({
        enum: [
            Brand.Corsair, Brand.Apple, Brand.Adata, Brand.Gigabyte, Brand.Samsung, Brand.Intel,
        ],
        type: String,
        required: true,
    })
    brand: string;

    @Prop()
    description?: string;

    @Prop([String])
    tags: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    kind: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
