import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashPassword } from 'src/utils/password.utils';

export type UserDocument = User & Document;

function transformValue(doc: any, ret: { [key: string]: any }) {
    delete ret._id;
    delete ret.password;
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
export class User {
    @Prop({ 
        type: String, 
        required: [true, 'Username can not be empty'], 
        index: true,
    })
    username: string;

    @Prop({ 
        type: String, 
    })
    password: string;

    @Prop({ 
        type: Boolean, 
        default: false
    })
    isAdmin: boolean;

    @Prop({ 
        type: Boolean, 
        default: true
    })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    const self = this as UserDocument;
    if (!this.isModified('password')) {
      return next();
    }
    self.password = await hashPassword(self.password)
    next();
})