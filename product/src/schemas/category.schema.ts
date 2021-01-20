import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Category & Document;

@Schema({ 
    timestamps: true
})
export class Category {
    @Prop({ required: true })
    name!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'type',
});