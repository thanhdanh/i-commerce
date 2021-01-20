import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
    @Prop({ required: true })
    name!: string;

    @Prop()
    createdAt!: Date;

    @Prop()
    updatedAt!: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'tags',
});
