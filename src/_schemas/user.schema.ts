import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Exclude()
  _id: mongoose.Types.ObjectId;

  id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Exclude()
  @Prop()
  refreshToken: string;
  @Exclude()
  @Prop()
  refreshTokenExpiration: Date;

  constructor(partial: Partial<User>) {
    partial.id = partial._id.toString();
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
