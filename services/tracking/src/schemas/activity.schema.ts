import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;
export enum ActityType {
    SEARCH_PRODUCTS = 'search_products',
    GET_PROUCT_DETAIL = 'get_product_detail'
}

function transformValue(doc: any, ret: { [key: string]: any }) {
    delete ret._id;
}

@Schema({
    timestamps: true,
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: transformValue,
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: transformValue,
    },
    autoCreate: true,
})
export class Activity {
    @Prop({ 
        type: String, 
        required: [true, 'Type can not be empty'], 
        index: true,
        enum: ActityType
    })
    type: string;

    @Prop({ type: Object })
    query: {
        key: string,
        filterBy: string,
        orderBy: string,
        skip: number,
        limit: number,
    }
    
    @Prop({ default: 0 })
    duration: number;

    message: string;
    
    params: {
        productId: number,
    }
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);