import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Category & Document;

@Schema({ 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})
export class Category {
    @Prop({ required: true })
    name: string;
}