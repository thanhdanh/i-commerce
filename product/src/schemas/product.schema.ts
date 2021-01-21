import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

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
    timestamps: true
})
export class Product {
    @Prop({
        unique: true,
        required: true,
        length: 10
    })
    code!: string;

    @Prop({ required: true, minlength: 10 })
    name!: string;

    @Prop({
        required: true,
        default: 0
    })
    price!: number;

    @Prop()
    color!: string;

    @Prop({
        enum: [
            Brand.Corsair, Brand.Apple, Brand.Adata, Brand.Gigabyte, Brand.Samsung, Brand.Intel,
        ],
        type: String,
        required: true,
    })
    brand!: string;

    @Prop()
    description?: string;

    @Prop({ default: true })
    visible!: boolean;

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Tag' }])
    tags!: Types.ObjectId[];

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
    type!: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt!: Date;

    @Prop({ default: Date.now })
    updatedAt!: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
